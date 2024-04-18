import React, { useCallback, useState } from 'react';
import { Rnd } from 'react-rnd';
import VideoDoubleClick from './DoubleClickHandlers/VideoDoubleClick';
import { containerWidth, containerHeight } from '../../../shared/globals';

const VideoPlayer = ({
  style,
  element,
  onDragStop,
  onResizeStop,
  handleDeleteElement,
  renderCornerBoxes,
  selectedSlideId,
  presentationId,
}) => {
  const extractVideoID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\s*[^/\n\s]+\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const [clickTimeout, setClickTimeout] = useState(null);

  const [openEditTextBox, setOpenEditTextBox] = useState(false);
  const handleOpenEditTextBox = () => setOpenEditTextBox(true);
  const handleCloseEditTextBox = () => {
    setOpenEditTextBox(false);
  };
  const handleEditTextBoxSelected = () => {
    handleOpenEditTextBox();
  };

  const handleClick = useCallback(() => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleEditTextBoxSelected();
    } else {
      const timeout = setTimeout(() => {
        setClickTimeout(null);
      }, 500);
      setClickTimeout(timeout);
    }
  }, [clickTimeout, element]);

  const videoSrc = `https://www.youtube.com/embed/${extractVideoID(
    element.src
  )}?autoplay=${element.autoplay ? '1' : '0'}&mute=1`;
  return (
    <>
      <Rnd
        default={{
          x: (element.top / 100) * containerWidth,
          y: (element.left / 100) * containerHeight,
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
        <div style={style} onClick={handleClick}>
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
      <VideoDoubleClick
        open={openEditTextBox}
        handleCloseEditTextBox={handleCloseEditTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        element={element}
      />
    </>
  );
};

export default VideoPlayer;
