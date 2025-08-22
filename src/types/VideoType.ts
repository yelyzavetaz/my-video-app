export type VideoStage = "uploading" | "processing" | "readyToWatch";

export interface Video {
  id: string;
  name: string;
  stage: VideoStage;
  progress: number;
  sources: { [lang: string]: string }; // мова -> url відео
  duration?: number;
}
