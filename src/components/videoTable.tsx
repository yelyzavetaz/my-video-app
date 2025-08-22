// src/components/VideoTable.tsx
import { useNavigate } from "react-router-dom";
import { useVideoStore } from "../store/useVideoStore";
import type { Video } from "../types/VideoType";

export default function VideoTable() {
  const videos: Video[] = useVideoStore((s) => s.videos);
  const navigate = useNavigate();

  return (
    <table className="min-w-full bg-white shadow rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-gray-600">Title</th>
          <th className="px-4 py-2 text-left text-gray-600">Duration</th>
          <th className="px-4 py-2 text-left text-gray-600">Status</th>
        </tr>
      </thead>
      <tbody>
        {videos.map((v) => (
          <tr key={v.id}>
            <td className="border p-2">{v.name}</td>
            <td className="border p-2">{v.duration}</td>
            <td className="border p-2 text-center">
              {v.stage === "readyToWatch" ? (
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  onClick={() => navigate(`/player/${v.id}`)}
                >
                  Watch
                </button>
              ) : v.stage === "uploading" ? (
                `${v.progress}%`
              ) : (
                v.stage
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
