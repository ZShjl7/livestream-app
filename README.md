# 🎥 Live Stream App with Overlays  

A full-stack application that allows you to **stream video from an RTSP camera (or file)** using **FFmpeg + HLS** and interact with it through **real-time overlays** (comments, emojis, etc.) on top of the video.  

---

## ✨ Features  
✅ Stream video via RTSP using FFmpeg  
✅ Convert stream into **HLS** format for browser playback  
✅ Watch live video in the React frontend  
✅ Add, move, resize, and delete overlays (comments/emojis)  
✅ Store overlay data in **MongoDB Atlas**  
✅ Flask backend with REST API for overlays  

---

## 🛠 Tech Stack  

- **Backend:** Python (Flask, PyMongo)  
- **Frontend:** React + TypeScript  
- **Database:** MongoDB Atlas  
- **Streaming:** FFmpeg + HLS  
- **Video Player:** Hls.js  

---

## 🔧 Installation  

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/live-stream-app.git
cd live-stream-app
```

### 2️⃣ Backend Setup (Flask API)
```bash
cd backend
pip install -r requirements.txt
```
Create a ```.env```  file in  ```backend/``` with your MongoDB Atlas connection:
```bash
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=livestream
FLASK_HOST=127.0.0.1
FLASK_PORT=8000
```
Run Flask server:
```bash
python app.py
```

### 3️⃣ Frontend Setup (React App)
Open another terminal and navigate to ```frontend/:```
```bash
cd frontend
##install dependencies
npm install
##Run development server
npm start
```

### 4️⃣ Setup FFmpeg (RTSP → HLS)
We need FFmpeg to take the RTSP stream and convert it into HLS.
Example Command:
```bash
ffmpeg -rtsp_transport tcp -i "rtsp://your-camera-ip:554/stream" \
 -c:v libx264 -c:a aac -f hls \
 -hls_time 2 -hls_list_size 6 -hls_flags delete_segments \
 -hls_segment_filename "backend/static/hls/stream_%03d.ts" \
 "backend/static/hls/stream.m3u8"
```
Replace ```rtsp://your-camera-ip:554/stream``` with your RTSP camera link.

The HLS files (.m3u8 + .ts) will be saved in:
```
backend/static/hls/
```

## Why FFmpeg + HLS?

**RTSP** (Real Time Streaming Protocol) is used by most IP cameras but browsers don’t support it.

**FFmpeg** is a powerful tool that converts RTSP → HLS.

**HLS** (HTTP Live Streaming) is supported by all modern browsers, making it perfect for web apps.

👉 So, FFmpeg acts like a translator between your RTSP camera and the browser.


## Overlay System

**Post comments →** Enter text or emojis (😊🔥🎉) in the input box and press Post.

**Move overlays →** Drag comments anywhere on the video.

**Resize overlays →** Adjust size using drag handles.

**Delete overlays →** Remove them with ❌ button.

All overlays are stored in MongoDB, so they stay even after refreshing the page.

## 📑 API Documentation  

For detailed explanation of all CRUD endpoints (Create, Read, Update, Delete) and how to interact with them, please check the full PDF documentation:  

👉 [View API Documentation (PDF)](./API_Documentation.pdf)

## 📸 Screenshots  

### 🖥️ App Preview 1
[![Whats-App-Image-2025-08-19-at-19-45-51-b4021b70.jpg](https://i.postimg.cc/CKZbtrmf/Whats-App-Image-2025-08-19-at-19-45-51-b4021b70.jpg)](https://postimg.cc/VS8S0gyY)

### 🖥️ App Preview 2
[![Whats-App-Image-2025-08-19-at-19-48-11-89680f17.jpg](https://i.postimg.cc/7hJcZNHC/Whats-App-Image-2025-08-19-at-19-48-11-89680f17.jpg)](https://postimg.cc/H8H3SX7H)


