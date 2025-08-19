import React from "react";
import VideoPlayer from "./components/Videoplayer";
import OverlayEditor from "./components/Overlay";

function App() {
  return (
    <div>
      <h1>🎥 Livestream App</h1>
      <VideoPlayer />
      <OverlayEditor />
    </div>
  );
}

export default App;
