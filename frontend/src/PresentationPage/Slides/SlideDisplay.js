import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';
import VideoPlayer from './ElementDisplays.js/VideoPlayer';
import CornerBox from './CornerBox';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import CodeElementDisplay from './ElementDisplays.js/CodeElementDisplay';
import ImageElementDisplay from './ElementDisplays.js/ImageElementDisplay';
import TextBoxElementDisplay from './ElementDisplays.js/TextBoxElementDisplay';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import {
  setContainerHeight,
  setContainerWidth,
  containerWidth,
  containerHeight,
} from '../../shared/globals';
import TextBoxModal from './EditSlide/TextBoxModal';
import VideoModal from './EditSlide/VideoModal';
import ImageModal from './EditSlide/ImageModal';
import CodeModal from './EditSlide/CodeModal';
import SlideHistory from './EditSlide/SlideHistory/SlideHistory';
import SlideChangeColourModal from './EditSlide/SlideChangeColourModal';

const SlideDisplay = ({
  presentationId,
  selectedSlideId,
  isScreenLessThan1000,
  isScreenLessThan700,
}) => {
  // let containerWidth = 1000;
  // let containerHeight = 500;

  if (isScreenLessThan700) {
    setContainerWidth(400);
    setContainerHeight(200);
  } else if (isScreenLessThan1000) {
    setContainerWidth(700);
    setContainerHeight(350);
  } else {
    setContainerWidth(1000);
    setContainerHeight(500);
  }

  const version = usePresentationListStore((state) => state.version);

  const {
    selectedSlide,
    updateElementPosition,
    updateElementSize,
    deleteElementFromSlide,
  } = usePresentationListStore(
    useCallback(
      (store) => ({
        selectedSlide: store.getSlideFromPresentationById(
          presentationId,
          selectedSlideId
        ),
        updateElementPosition: store.updateElementPosition,
        updateElementSize: store.updateElementSize,
        deleteElementFromSlide: store.deleteElementFromSlide,
      }),
      [presentationId, selectedSlideId, version]
    )
  );

  const [selectedElement, setSelectedElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const [rerender, setRerender] = useState(false);
  // useEffect(() => {
  //   console.log('Version changed:', version);
  //   setRerender((prev) => !prev); // Toggle to force rerender
  // }, [version]);

  useEffect(() => {
    Prism.highlightAll();
    console.log(version, 'version');
  }, [selectedSlide]);

  const handleSelectedElement = (element) => {
    setSelectedElement(element);
  };

  const onDragStop = (e, d, element) => {
    updateElementPosition(
      presentationId,
      selectedSlideId,
      element.id,
      `${(d.x / containerWidth) * 100}`,
      `${(d.y / containerHeight) * 100}`
    );
    console.log(
      `${(d.x / containerWidth) * 100}`,
      `${(d.y / containerHeight) * 100}`,
      'IHWRYUOWUYERGIUEWYRGYIUEWGRUWEGIURGUY',
      d.x,
      d.y,
      d
    );
    setSelectedElement({
      ...element,
      top: `${(d.y / containerHeight) * 100}`,
      left: `${(d.x / containerWidth) * 100}`,
    });
  };

  const onResizeStop = (e, direction, ref, delta, position, element) => {
    const newSize = {
      width: `${(ref.offsetWidth / containerWidth) * 100}`,
      height: `${(ref.offsetHeight / containerHeight) * 100}`,
    };
    const newPosition = {
      top: `${(position.y / containerHeight) * 100}`,
      left: `${(position.x / containerWidth) * 100}`,
    };
    updateElementSize(
      presentationId,
      selectedSlideId,
      element.id,
      newSize.width,
      newSize.height
    );
    updateElementPosition(
      presentationId,
      selectedSlideId,
      element.id,
      newPosition.left,
      newPosition.top
    );
    setSelectedElement({ ...element, ...newSize, ...newPosition });
  };

  const handleDeleteElement = (elementId, e) => {
    e.preventDefault();
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
    deleteElementFromSlide(presentationId, selectedSlideId, elementId);
  };

  const renderCornerBoxes = useCallback(
    (element) => {
      console.log(selectedElement);
      if (selectedElement === null || selectedElement.id !== element.id) {
        return null;
      }

      const elementWidthPx =
        (parseInt(selectedElement.width) / 100) * containerWidth;
      const elementHeightPx =
        (parseInt(selectedElement.height) / 100) * containerHeight;

      const corners = [
        { top: 0, left: 0 }, // Top-left
        { top: 0, left: 0 + elementWidthPx - 10 }, // Top-right-
        { top: 0 + elementHeightPx - 10, left: 0 }, // Bottom-left
        {
          top: 0 + elementHeightPx - 10,
          left: 0 + elementWidthPx - 10,
        }, // Bottom-right
      ];

      console.log(corners, 'corners I AM CORNER HEY HEY');

      return corners.map((style, index) => (
        <CornerBox key={index} style={style} />
      ));
    },
    [selectedElement]
  );

  // Check if there are elements and elements is not empty
  const getElements = () => {
    if (selectedSlide?.elements?.length) {
      // Access the last element in the array
      const lastElementObj =
        selectedSlide.elements[selectedSlide.elements.length - 1];

      // Assuming we don't know the key name and there's only one key per object
      const key = Object.keys(lastElementObj)[0]; // Get the key of the last object
      const values = lastElementObj[key]; // Get the value using the key which is an array

      // Now you can use 'values' which is the array associated with the last time key
      return values; // Outputs the array of the last element object
    } else {
      return [];
    }
  };

  console.log(selectedSlide, 'selectedSlide');

  const [openCreateTextBox, setOpenCreateTextBox] = useState(false);
  const handleOpenCreateTextBox = () => setOpenCreateTextBox(true);
  const handleCloseCreateTextBox = () => {
    setOpenCreateTextBox(false);
  };

  const [openImageHandler, setOpenImageHandler] = useState(false);
  const handleOpenImageHandler = () => setOpenImageHandler(true);
  const handleCloseImageHandler = () => {
    setOpenImageHandler(false);
  };

  const [openVideoHandler, setOpenVideoHandler] = useState(false);
  const handleOpenVideoHandler = () => setOpenVideoHandler(true);
  const handleCloseVideoHandler = () => {
    setOpenVideoHandler(false);
  };

  const [openCodeHandler, setOpenCodeHandler] = useState(false);
  const handleOpenCodeHandler = () => setOpenCodeHandler(true);
  const handleCloseCodeHandler = () => {
    setOpenCodeHandler(false);
  };

  const [OpenSlideHistoryHandler, setOpenSlideHistoryHandler] = useState(false);
  const handleOpenSlideHistoryHandler = () => setOpenSlideHistoryHandler(true);
  const handleCloseSlideHistoryHandler = () => {
    setOpenSlideHistoryHandler(false);
  };

  const [OpenSlideColourPalette, setOpenSlideColourPalette] = useState(false);
  const handleOpenColourPaletteHandler = () => setOpenSlideColourPalette(true);
  const handleCloseSlideColourPalette = () => {
    setOpenSlideColourPalette(false);
  };
  const handleAddTextOnSlide = () => {
    setAnchorEl(null);
    setTimeout(handleOpenCreateTextBox(), 100);
  };

  const handleAddImageOnSlide = () => {
    handleOpenImageHandler();
  };

  const handleAddVideoOnSlide = () => {
    handleOpenVideoHandler();
  };

  const handleAddCodeOnSlide = () => {
    handleOpenCodeHandler();
  };

  const handleOpenSlideHistory = () => {
    handleOpenSlideHistoryHandler();
  };

  const handleOpenColourPalette = () => {
    handleOpenColourPaletteHandler();
  };
  return (
    <div
      key={version}
      className="slideDisplaylolol"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: selectedSlide.bgCol
          ? selectedSlide.bgCol
          : `linear-gradient(${'to bottom right'}, ${'#999'}, ${'#999'})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {getElements().map((element) => {
        if (element.type === 'textarea') {
          return (
            <TextBoxElementDisplay
              presentationId={presentationId}
              selectedSlideId={selectedSlideId}
              key={element.id}
              element={element}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              handleDeleteElement={handleDeleteElement}
              renderCornerBoxes={renderCornerBoxes}
              handleSelectedElement={handleSelectedElement}
            />
          );
        } else if (element.type === 'image') {
          return (
            <ImageElementDisplay
              presentationId={presentationId}
              selectedSlideId={selectedSlideId}
              key={element.id}
              element={element}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              handleDeleteElement={handleDeleteElement}
              renderCornerBoxes={renderCornerBoxes}
              handleSelectedElement={handleSelectedElement}
            />
          );
        } else if (element.type === 'video') {
          return (
            <VideoPlayer
              style={{
                position: 'absolute',
                top: `${element.top}`,
                left: `${element.left}`,
                width: '100%',
                height: '100%',
                padding: '10px',
                backgroundColor: '#000',
              }}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              handleDeleteElement={handleDeleteElement}
              renderCornerBoxes={renderCornerBoxes}
              key={element.id}
              element={element}
              onClick={() => handleSelectedElement(element)}
              presentationId={presentationId}
              selectedSlideId={selectedSlideId}
            />
          );
        }
        if (element.type === 'code') {
          return (
            <CodeElementDisplay
              key={element.id}
              element={element}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              handleDeleteElement={handleDeleteElement}
              renderCornerBoxes={renderCornerBoxes}
              presentationId={presentationId}
              selectedSlideId={selectedSlideId}
            />
          );
        } else {
          return <></>;
        }
      })}

      <Typography
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
        data-testid={'slide-number-for-current-slide'}
      >
        {selectedSlide?.slideNumber}
      </Typography>

      <Typography
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        data-testid={'edit-btn'}
        onClick={handleClick}
      >
        Edit
      </Typography>

      <EditMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        handleAddTextOnSlide={handleAddTextOnSlide}
        handleAddImageOnSlide={handleAddImageOnSlide}
        handleAddVideoOnSlide={handleAddVideoOnSlide}
        handleAddCodeOnSlide={handleAddCodeOnSlide}
        handleOpenSlideHistory={handleOpenSlideHistory}
        handleOpenColourPalette={handleOpenColourPalette}
      />
      <TextBoxModal
        open={openCreateTextBox}
        handleCloseCreateTextBox={handleCloseCreateTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <ImageModal
        open={openImageHandler}
        handleCloseImageHandler={handleCloseImageHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <VideoModal
        open={openVideoHandler}
        handleCloseVideoHandler={handleCloseVideoHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <CodeModal
        open={openCodeHandler}
        handleCloseCodeHandler={handleCloseCodeHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <SlideHistory
        open={OpenSlideHistoryHandler}
        handleCloseCodeHandler={handleCloseSlideHistoryHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <SlideChangeColourModal
        open={OpenSlideColourPalette}
        handleCloseSlideColourPalette={handleCloseSlideColourPalette}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
    </div>
  );
};

export default SlideDisplay;
