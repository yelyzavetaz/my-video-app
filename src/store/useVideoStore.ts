// src/store/useVideoStore.ts
import { create } from "zustand";
import type { Video, VideoStage } from "../types/VideoType";


interface VideoState {
  videos: Video[];
  addVideo: (file: File) => void;
  updateStage: (id: string, stage: VideoStage) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  addVideo: (file) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      name: file.name,
      stage: "uploading",
      progress: 0,
      sources: {
        en: "/videos/sample-en.mp4",
        ua: "/videos/sample-ua.mp4",
        es: "/videos/sample-es.mp4",
      },
    };

    set((state) => ({ videos: [...state.videos, newVideo] }));

    // емуляція прогресу загрузки
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === newVideo.id ? { ...v, stage: "readyToWatch", progress: 100 } : v
          ),
        }));
      } else {
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === newVideo.id ? { ...v, progress } : v
          ),
        }));
      }
    }, 500);
  },
  updateStage: (id, stage) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v.id === id ? { ...v, stage } : v
      ),
    })),
}));
