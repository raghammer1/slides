import React from 'react';
import { Rnd } from 'react-rnd';
const ImageElementDisplay = ({
  element,
  handleDeleteElement,
  onResizeStop,
  onDragStop,
  handleSelectedElement,
  renderCornerBoxes,
}) => {
  return (
    <Rnd
      default={{
        x: element.top,
        y: element.left,
        width: `${element.width}%`,
        height: `${element.height}%`,
      }}
      className={element.id}
      data-testid={'image-box-element-test'}
      bounds="parent"
      key={element.id}
      onDragStop={(e, d) => onDragStop(e, d, element)}
      onResizeStop={(e, direction, ref, delta, position) =>
        onResizeStop(e, direction, ref, delta, position, element)
      }
      onContextMenu={(e) => handleDeleteElement(element.id, e)}
    >
      <div key={element.id}>
        <img
          draggable="false"
          src={element.src}
          alt={element.alt}
          style={{
            position: 'absolute',
            top: element.top,
            left: element.left,
            height: '100%',
            width: '100%',
            resize: 'none',
          }}
        />
        {renderCornerBoxes(element)}
      </div>
    </Rnd>
  );
};
export default ImageElementDisplay;
