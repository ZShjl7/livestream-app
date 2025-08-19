import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("http://localhost:8000/hls/stream.m3u8");
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = "http://localhost:8000/hls/stream.m3u8";
      }
    }
  }, []);

  return <video ref={videoRef} controls autoPlay style={{ width: "100%" }} />;
};

export default VideoPlayer;
