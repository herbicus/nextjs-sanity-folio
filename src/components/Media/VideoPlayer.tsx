"use client";

import ReactPlayer from "react-player";
import clsx from "clsx";

interface VideoPlayerProps {
  url: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, className }) => {
  if (!url) return null;

  return (
    <div
      className={clsx(
        "w-full relative aspect-video bg-black overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        <ReactPlayer
          src={url}
          width="100%"
          height="100%"
          controls
          playing={false}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
