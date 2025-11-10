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
        "*:absolute *:inset-0 *:object-cover",
        className
      )}
    >
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls
        playing={false}
      />
    </div>
  );
};

export default VideoPlayer;
