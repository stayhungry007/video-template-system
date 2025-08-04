import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import ffmpeg from 'fluent-ffmpeg';
import fs from "fs";
import { getVideoMetadata } from "./VideoSampleProcessor"; // Importing the function
import { VideoTemplate, VideoStream, Frame } from "./types/index";

const app = express();
const port = 3000;

app.use(cors());
// Set up file upload storage with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware to serve static files (like video)
app.use(express.static("uploads"));

// Video upload and template creation endpoint
app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No video file uploaded");
    }

    const videoPath = path.join(__dirname, "uploads", req.file.filename);

    // Call the video processing function to extract metadata
    const metadata = await getVideoMetadata(videoPath);

    // Extract video structure (e.g., resolution, duration, etc.)

    const template: VideoTemplate = {
      resolution: `${metadata.streams[0].width}x${metadata.streams[0].height}`,
      duration: metadata.format.duration,
      codec: metadata.streams[0].codec_name,
      frameRate: metadata.streams[0].r_frame_rate || "N/A",
      bitrate: metadata.format.bit_rate || "N/A",
      fileSize: metadata.format.size || "N/A",
      format: metadata.format.format_name || "N/A",
      audioCodec:
        metadata.streams.find(
          (stream: VideoStream) => stream.codec_type === "audio"
        )?.codec_name || "N/A",
      audioChannels:
        metadata.streams.find(
          (stream: VideoStream) => stream.codec_type === "audio"
        )?.channels || 0,
      audioSampleRate:
        metadata.streams.find(
          (stream: VideoStream) => stream.codec_type === "audio"
        )?.sample_rate || 0,
    };

    // Check if `frames` exist before trying to filter keyframes
    if (metadata.frames && Array.isArray(metadata.frames)) {
      const keyframes = metadata.frames.filter(
        (frame: Frame) => frame.key_frame === 1
      ); // Keyframes have key_frame = 1

      // Add keyframe data to the template if keyframes are found
      if (keyframes.length > 0) {
        template.keyframes = keyframes.map((frame: Frame) => ({
          time: frame.best_effort_timestamp, // Timestamp of the keyframe
          frame: frame.pkt_pts, // Frame number or timestamp
        }));
      }
    } else {
      console.log("No frame data available for this video.");
    }
    // Return the template to the client
    res.json({ message: "Video uploaded successfully", template });
  } catch (error) {
    console.error("Error during video processing:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


app.post('/generate', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No video file uploaded.');
    }

    const template = JSON.parse(req.body.template);

    if (!template) {
      return res.status(400).send('Template is required for video generation');
    }

    const fileName = req.file.filename;
    const videoPath = path.join(__dirname, 'uploads',fileName);
    const outputVideoPath = path.join(__dirname, 'uploads', `generated-${fileName}`);

    const resolution = template.resolution;

    if (!resolution || !/^\d+x\d+$/.test(resolution)) {
      return res.status(400).send('Invalid resolution format');
    }

    ffmpeg(videoPath)
      .output(outputVideoPath)
      .videoCodec(template.codec)  // Set the codec based on the extracted template
      .size(resolution)   // Set the resolution based on the template
      .fps(parseInt(template.frameRate))  // Set the frame rate based on the template
      .audioCodec(template.audioCodec)  // Set the audio codec based on the template
      .audioChannels(template.audioChannels)  // Set the number of audio channels based on the template
      .audioFrequency(template.audioSampleRate)  // Set the audio sample rate based on the template
      .on('end', function() {
        console.log('Video processing finished');
        res.json({
          message: 'Video generated successfully',
          downloadUrl: outputVideoPath,
        });
      })
      .on('error', function(err) {
        console.log('Error: ' + err.message);
        res.status(500).json({ message: 'Error processing video', error: err });
      })
      .run();
  } catch (error) {
    console.error('Error during video processing:', error);
    res.status(500).json({message: 'Error processing video', error});
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
