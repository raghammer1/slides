import React from 'react';

const VideoPlayer = ({ style, element }) => {
  // State to manage whether autoplay is enabled
  // Construct the YouTube video URL with autoplay parameter

  // Function to extract YouTube video ID from URL
  const extractVideoID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\s*[^/\n\s]+\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // const videoSrc = `${element.src}?autoplay=${element.autoplay ? '1' : '0'}`;
  const videoSrc = `https://www.youtube.com/embed/${extractVideoID(
    element.src
  )}?autoplay=${element.autoplay ? '1' : '0'}&mute=1`;
  return (
    <div style={style}>
      <iframe
        width={style.width}
        height={style.height}
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
