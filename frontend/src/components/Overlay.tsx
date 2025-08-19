import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { getOverlays, createOverlay, updateOverlay, deleteOverlay } from "../api";

interface Overlay {
  id?: string;
  type: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const OverlayEditor: React.FC = () => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    getOverlays().then(res => setOverlays(res.data));
  }, []);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const newOverlay: Overlay = {
      type: "comment",
      content: comment,
      x: 0.1,
      y: 0.1,
      width: 0.3,
      height: 0.1,
    };

    const res = await createOverlay(newOverlay);
    setOverlays([...overlays, res.data]);
    setComment(""); 
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteOverlay(id);
    setOverlays(overlays.filter(o => o.id !== id));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "500px", background: "#eee" }}>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment... 😊🔥🎉"
          style={{ flex: 1, padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button onClick={handleAddComment} style={{ padding: "6px 12px" }}>
          Post
        </button>
      </div>

      {overlays.map((overlay) => (
        <Rnd
          key={overlay.id}
          default={{
            x: overlay.x * 500,
            y: overlay.y * 500,
            width: overlay.width * 500,
            height: overlay.height * 500,
          }}
          onDragStop={(_, d) => {
            if (overlay.id) {
              updateOverlay(overlay.id, { x: d.x / 500, y: d.y / 500 });
            }
          }}
          onResizeStop={(_, __, ref, ___, pos) => {
            if (overlay.id) {
              updateOverlay(overlay.id, {
                width: ref.offsetWidth / 500,
                height: ref.offsetHeight / 500,
                x: pos.x / 500,
                y: pos.y / 500,
              });
            }
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              borderRadius: "6px",
              padding: "6px",
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>{overlay.content}</span>
            <button
              onClick={() => handleDelete(overlay.id)}
              style={{
                marginLeft: "8px",
                background: "transparent",
                border: "none",
                color: "red",
                cursor: "pointer"
              }}
            >
              ❌
            </button>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default OverlayEditor;
