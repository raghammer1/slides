import React from 'react';
// import { containerWidth, containerHeight } from '../../shared/globals';

const VideoPreview = ({ element, size }) => {
  const topStyle = `${element.left}%`;
  const leftStyle = `${element.top}%`;

  const extractVideoID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\s*[^/\n\s]+\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoSrc = `https://www.youtube.com/embed/${extractVideoID(
    element.src
  )}?autoplay=${element.autoplay ? '1' : '0'}&mute=1`;

  return (
    <div
      style={{
        position: 'absolute',
        top: topStyle,
        left: leftStyle,
        width: `${element.width}%`,
        height: `${element.height}%`,
        border: 'none',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default VideoPreview;
