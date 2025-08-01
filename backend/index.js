"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("multer");
var fluent_ffmpeg_1 = require("fluent-ffmpeg");
var path_1 = require("path");
// Initialize Express app
var app = (0, express_1.default)();
var port = 3000;
// Multer setup for video uploads
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
var upload = (0, multer_1.default)({ storage: storage });
// Middleware to serve static files (like video)
app.use(express_1.default.static('uploads'));
// Video upload and template creation endpoint
app.post('/upload', upload.single('video'), function (req, res) {
    if (!req.file) {
        return res.status(400).send('No video file uploaded');
    }
    var videoPath = path_1.default.join(__dirname, 'uploads', req.file.filename);
    // Extract video metadata using ffmpeg
    fluent_ffmpeg_1.default.ffprobe(videoPath, function (err, metadata) {
        if (err) {
            return res.status(500).send('Error processing video');
        }
        // Extract video structure (e.g., resolution, duration, etc.)
        var template = {
            resolution: "".concat(metadata.streams[0].width, "x").concat(metadata.streams[0].height),
            duration: metadata.format.duration,
            codec: metadata.streams[0].codec_name,
        };
        // Store template or return as response
        res.json({ message: 'Video uploaded successfully', template: template });
    });
});
// Start server
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
