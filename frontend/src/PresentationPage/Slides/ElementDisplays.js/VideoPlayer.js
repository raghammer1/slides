import React from 'react';
import { Rnd } from 'react-rnd';

const VideoPlayer = ({
  style,
  element,
  onDragStop,
  onResizeStop,
  handleDeleteElement,
  renderCornerBoxes,
}) => {
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
    <Rnd
      default={{
        x: element.top,
        y: element.left,
        width: `${element.width}%`,
        height: `${element.height}%`,
      }}
      className={element.id}
      bounds="parent"
      key={element.id}
      onDragStop={(e, d) => onDragStop(e, d, element)}
      onResizeStop={(e, direction, ref, delta, position) =>
        onResizeStop(e, direction, ref, delta, position, element)
      }
      onContextMenu={(e) => handleDeleteElement(element.id, e)}
    >
      <div style={style}>
        <iframe
          width={style.width}
          height={style.height}
          src={videoSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {renderCornerBoxes(element)}
    </Rnd>
  );
};

export default VideoPlayer;
