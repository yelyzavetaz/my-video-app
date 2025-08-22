// src/pages/Videos.tsx
import { useVideoStore } from "../store/useVideoStore";
import { useNavigate } from "react-router-dom";
import type { Video } from "../types/VideoType";

export default function Videos() {
  const videos: Video[] = useVideoStore((s) => s.videos);
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Your Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/player/${video.id}`)}
          >
            <div className="relative pb-56 w-full overflow-hidden rounded-t-xl">
              <video
                src={video.sources.en}
                className="absolute inset-0 h-full w-full object-cover rounded-t-xl"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{video.name}</h3>
              <p className="text-sm text-gray-500">{video.sources.en.split('/').pop()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}