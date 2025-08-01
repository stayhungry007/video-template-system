# Video Template System

## Overview

The **Video Template System** allows users to upload a video, and the system automatically extracts key metadata (such as resolution, codec, and duration) to generate a reusable template. Users can apply this template to other videos with similar characteristics. This project demonstrates how to handle video uploads, process video metadata using **FFmpeg**, and generate video templates that define video properties such as resolution, codec, and duration.

## Features

- Video upload functionality.
- Video metadata extraction using **FFmpeg**.
- Generation of a reusable video template (e.g., resolution, codec, duration).
- Frontend interface for video uploads and template display.
- Backend API to handle video uploads and metadata processing.

## Technologies

- **Backend**: Node.js with Express.js.
- **Video Processing**: FFmpeg (used to extract video metadata).
- **Frontend**: HTML, CSS, JavaScript (vanilla JS).
- **File Upload**: Multer for handling file uploads in the backend.
- **Video Storage**: Local file system (uploads are stored in a directory on the server).
  
## Project Structure

```
video-template-system/
│
├── backend/ # Backend server (Express.js)
│ ├── uploads/ # Uploaded video files
│ ├── index.ts # Main server file
│ ├── videoProcessor.ts # Video processing logic (FFmpeg)
│ ├── package.json # Backend dependencies
│
├── frontend/ # Frontend files (HTML, CSS, JavaScript)
│ ├── index.html # Video upload page
│ ├── style.css # Optional styling
│ ├── script.js # Client-side logic for video upload
│
├── .gitignore # Git ignore file
├── README.md # Project description and instructions
└── package.json # Root project dependencies (for frontend and backend)
```


## Installation

### 1. Clone the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/stayhungry007/video-template-system.git
cd video-template-system
```

### 2. Backend Setup
The backend is built with Node.js and Express, and it handles video uploads and metadata extraction.

- 2.1 Install Backend Dependencies

Navigate to the **backend/** directory and install the required dependencies:
```bash
cd backend
npm install
```
- 2.2 Running the Backend

After installing the dependencies, you can start the backend server:

```bash
npm run dev
```
This will start the backend server at http://localhost:3000, which will handle video uploads and metadata extraction.


### 3. Frontend Setup
The frontend allows users to upload videos and view the generated video templates.

- Open the Frontend HTML File
You can directly open the frontend/index.html file in any modern browser. This HTML file provides a simple interface to upload videos and displays the generated template.

### 4. Running the Project
- Once both the backend and frontend are set up, you can upload a video via the frontend.

- Open **frontend/index.html** in your browser.

- Use the file input to select a video from your local machine.

- The frontend will send the video to the backend API.

- The backend will process the video, generate a template, and return the template data (resolution, duration, and codec) to the frontend.

- The frontend will display the extracted template data.

## Example Video
The selected example video for this system is a 30-second promotional video with the following properties:

- Resolution: 1920x1080

- Duration: 30 seconds

- Codec: H.264

Once the video is uploaded, the backend will extract this metadata and generate a template that describes the video’s structure.

## Template Design
The video template consists of key properties that define the structure of the video:

- Resolution: Specifies the width and height of the video (e.g., 1920x1080).

- Duration: The total duration of the video in seconds (e.g., 30 seconds).

- Codec: The video codec used to encode the video (e.g., h264).

This template can be reused for videos with similar characteristics, allowing users to automate the video creation process by applying similar templates to new videos.

## Example Workflow
Upload a Video: Select a video from your local machine using the file input on the frontend page.

**Generate a Template:** The backend processes the video and generates a template based on the video’s metadata.

**View Template:** The frontend displays the generated template, showing the resolution, duration, and codec of the uploaded video.

**Reuse Template:** You can apply the same template to other videos with similar characteristics (e.g., similar resolution and codec).

## How It Works
### Backend
The backend consists of an Express server that provides an API for handling video uploads. It uses Multer for handling the file upload and FFmpeg to extract metadata from the video. When a video is uploaded, the backend uses FFmpeg's ffprobe to retrieve metadata like the resolution, codec, and duration, which it then returns to the frontend.

### Frontend
The frontend provides a simple interface for uploading videos. It uses JavaScript to send the video to the backend and receive the generated template. The template is displayed on the frontend after the video is processed.

### Video Metadata Extraction
FFmpeg is used to analyze the video and extract the following metadata:

- Resolution: Width and height of the video (e.g., 1920x1080).

- Duration: The total duration of the video in seconds.

- Codec: The video codec used to encode the video (e.g., h264).

### Video Storage
Videos are temporarily stored in the backend/uploads/ folder during the processing. You can modify this storage location depending on your requirements (e.g., using cloud storage in production).

## Notes
- **Video Format Support:** FFmpeg supports a wide range of video formats, so this system should work with most video files. However, if you encounter any unsupported formats, make sure FFmpeg supports them.

- **Security:** The system currently does not include strict security measures for file uploads (e.g., limiting file size or type). For production use, you should implement these measures to ensure the system is secure.

## Future Enhancements
- **Template Management:** Allow users to save multiple templates and apply them to different videos.

- **More Metadata:** Extract and use more advanced metadata, such as audio tracks, scene transitions, and keyframes.

- **Cloud Storage:** Replace local storage with cloud storage for scalability.

- **Text Overlays & Transitions:** Enhance the template system to support automatic text overlays, transitions, and effects.

## License
This project is open-source and available under the MIT License.

## Troubleshooting
If you encounter any issues while setting up or running the project, here are some common solutions:

- **"FFmpeg not found" error:** Ensure that FFmpeg is installed and available in your system’s PATH.

    - **Install FFmpeg.**
        - **Linux**
            ```bash
                sudo apt install ffmpeg
            ```
        - **macOS**
            ```bash
                brew install ffmpeg
            ```
        - **Windows**

            Download FFmpeg from [FFmpeg official site](https://ffmpeg.org/download.html), extract it, and add the `bin` directory to your system's PATH.

    After installation, verify FFmpeg by running:
    ```bash
    ffmpeg -version
    ```

- **Permission issues with file uploads:** Make sure the backend/uploads/ directory has the correct write permissions.

```bash
chmod -R 755 backend/uploads/
```
## Conclusion
This system allows users to easily upload videos and generate templates based on key video metadata. With the provided setup, you can quickly process and reuse templates for video production tasks. You can extend the system with more advanced features like text overlays, transitions, and cloud storage to make it even more powerful.