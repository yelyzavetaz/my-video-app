// src/pages/Player.tsx
import { useParams } from "react-router-dom";
import { useVideoStore } from "../store/useVideoStore";
import { useState } from "react";
import type { Video } from "../types/VideoType";

export default function Player() {
  const { id } = useParams();
  const video: Video | undefined  = useVideoStore((s) => s.videos.find((v) => v.id === id));
  const [lang, setLang] = useState("en");

  if (!video) return <p>Video not found</p>;

  return (
    // src/pages/Player.tsx
    // (rest of the code is the same)
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        <video src={video.sources[lang]} controls className="w-full" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {video.name}
          </h1>
          <div className="flex gap-3">
            {Object.keys(video.sources).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  lang === l
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
