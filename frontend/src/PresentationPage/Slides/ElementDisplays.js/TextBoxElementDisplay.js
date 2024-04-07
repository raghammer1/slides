import React from 'react';
import { Rnd } from 'react-rnd';
const TextBoxElementDisplay = ({
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
        width: `${element.width}%`, // Initial width based on element's width
        height: `${element.height}%`, // Initial height based on element's height
      }}
      className={element.id}
      data-testid={'text-box-element-test'}
      // minWidth={(parseFloat(element.width) / 100) * 1000}
      // minHeight={(parseFloat(element.height) / 100) * 500}
      bounds="parent"
      key={element.id}
      onDragStop={(e, d) => onDragStop(e, d, element)}
      onResizeStop={(e, direction, ref, delta, position) =>
        onResizeStop(e, direction, ref, delta, position, element)
      }
      onContextMenu={(e) => handleDeleteElement(element.id, e)}
    >
      <div key={element.id}>
        <textarea
          defaultValue={element.text}
          style={{
            position: 'absolute',
            top: element.top,
            left: element.left,
            height: '100%',
            width: '100%',
            fontSize: element.fontSize,
            color: element.color,
            resize: 'none',
            overflow: 'hidden',
            border: '2px solid #999',
            cursor: 'default',
          }}
          readOnly
          onClick={() => handleSelectedElement(element)}
        />
        {renderCornerBoxes(element)}
      </div>
    </Rnd>
  );
};
export default TextBoxElementDisplay;
