export interface VideoTemplate {
    resolution: string;
    duration: number;
    codec: string;
    frameRate: string;
    bitrate: string;
    fileSize: string;
    format: string;
    audioCodec: string;
    audioChannels: number;
    audioSampleRate: number;
    keyframes?: { time: number; frame: number }[]; // Added keyframes property to the template
}

export interface VideoStream {
  codec_type: string;
  codec_name: string;
  channels?: number;
  sample_rate?: number;
  width?: number;
  height?: number;
  r_frame_rate?: string;
}

// Define an interface for the frame
export interface Frame {
  key_frame: number;
  best_effort_timestamp: number;
  pkt_pts: number;
}
