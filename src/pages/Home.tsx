// src/pages/Home.tsx
import { useState } from "react";
import { useVideoStore } from "../store/useVideoStore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const addVideo = useVideoStore((s) => s.addVideo);
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setUploading(true);
      setProgress(0);

      // Simulate upload progress
      const fakeUpload = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(fakeUpload);
            setUploading(false);
            addVideo(file);
            navigate("/videos");
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold mb-4 text-purple-400">
        Video Vault 🎬
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Upload and watch your videos anytime, anywhere.
      </p>
      <label className="bg-purple-600 text-white font-bold px-8 py-4 rounded-lg cursor-pointer hover:bg-purple-700 transition duration-300 shadow-lg mb-4">
        <span className="text-lg">Upload New Video</span>
        <input type="file" accept="video/*" hidden onChange={handleUpload} />
      </label>
      {uploading && (
        <div className="w-64 bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-purple-400 h-4 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <button
        className="bg-gray-800 text-purple-400 font-bold px-8 py-3 rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg"
        onClick={() => navigate("/videos")}
      >
        See My Videos
      </button>
    </div>
  );
}
