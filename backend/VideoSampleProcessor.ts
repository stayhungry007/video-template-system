import ffmpeg from 'fluent-ffmpeg';

// Function to extract metadata from the uploaded video
export const getVideoMetadata = (videoPath: string) => {
  return new Promise<any>((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        console.log("Error during ffmpeg.ffprobe : ", err);
        return reject(err);
      }
      resolve(metadata);
    });
  });
};
