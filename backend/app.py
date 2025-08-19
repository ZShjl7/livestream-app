import os
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

# Load .env (contains MongoDB Atlas URI)
load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGODB_DB", "livestream")
HOST = os.getenv("FLASK_HOST", "127.0.0.1")
PORT = int(os.getenv("FLASK_PORT", "8000"))

app = Flask(__name__, static_folder="static", static_url_path="/static")
CORS(app)

# MongoDB Connection
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
overlays = db.overlays

# Convert MongoDB docs → JSON
def serialize(doc):
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc

# Serve HLS stream 
@app.get("/hls/<path:filename>")
def serve_hls(filename):
    return send_from_directory(os.path.join(app.static_folder, "hls"), filename)

# CRUD for overlays
@app.get("/api/overlays")
def get_overlays():
    docs = overlays.find().sort("updatedAt", -1)
    return jsonify([serialize(d) for d in docs]), 200

@app.post("/api/overlays")
def create_overlay():
    data = request.get_json(force=True) or {}
    doc = {
        "type": data.get("type", "text"),
        "content": data.get("content", "LIVE"),
        "x": float(data.get("x", 0.05)),
        "y": float(data.get("y", 0.05)),
        "width": float(data.get("width", 0.2)),
        "height": float(data.get("height", 0.1)),
        "zIndex": int(data.get("zIndex", 1)),
        "opacity": float(data.get("opacity", 1.0)),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
    }
    res = overlays.insert_one(doc)
    doc["_id"] = res.inserted_id
    return jsonify(serialize(doc)), 201

@app.put("/api/overlays/<id>")
def update_overlay(id):
    data = request.get_json(force=True) or {}
    allowed = {"type", "content", "x", "y", "width", "height", "zIndex", "opacity"}
    update = {k: data[k] for k in data if k in allowed}
    update["updatedAt"] = datetime.utcnow()
    overlays.update_one({"_id": ObjectId(id)}, {"$set": update})
    doc = overlays.find_one({"_id": ObjectId(id)})
    return jsonify(serialize(doc)), 200

@app.delete("/api/overlays/<id>")
def delete_overlay(id):
    overlays.delete_one({"_id": ObjectId(id)})
    return "", 204

if __name__ == "__main__":
    print(f"Flask running on {HOST}:{PORT}, MongoDB: {MONGO_URI}")
    app.run(host=HOST, port=PORT, debug=True)
