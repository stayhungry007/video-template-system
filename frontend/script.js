document.getElementById('videoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the file input element
    const videoFileInput = document.getElementById('videoFile');

    // Check if a file is selected
    if (!videoFileInput.files.length) {
        alert('Please select a video file to upload.');
        return; // Stop the form submission if no file is selected
    }

    const file = videoFileInput.files[0];

    // Validate file type (only allow .mp4 files)
    if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
    }

    const maxFileSize = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxFileSize) {
        alert('File is too large. Please select a file smaller than 100MB.');
        return;
    }

    const formData = new FormData();
    formData.append('video', videoFileInput.files[0]);
  
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      if (result.template) {
        document.getElementById('templateResult').innerHTML = `
          <h2>Generated Template</h2>
          <p>Resolution: ${result.template.resolution}</p>
          <p>Duration: ${result.template.duration} seconds</p>
          <p>Codec: ${result.template.codec}</p>
          <p>Frame Rate: ${result.template.frameRate}</p>
          <p>Bit Rate: ${result.template.bitrate}</p>
          <p>File Size: ${result.template.fileSize}</p>
          <p>Format: ${result.template.format}</p>
          <p>Audio Codec: ${result.template.audioCodec}</p>
          <p>Audio Channels: ${result.template.audioChannels}</p>
          <p>Audio SampleRate: ${result.template.audioSampleRate}</p>
        `;
      }
    } catch (error) {
      console.error('Error during upload:', error);
      document.getElementById('templateResult').innerText = 'Failed to generate template';
    }
  });
  
  