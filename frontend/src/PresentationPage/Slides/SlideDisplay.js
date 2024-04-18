import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';
import CornerBox from './CornerBox';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import {
  setContainerHeight,
  setContainerWidth,
  containerWidth,
  containerHeight,
} from '../../shared/globals';
import GetElement from './GetElement';
import ModalManager from './ModalManager';

// Component for rendering and managing slide display and interactions
const SlideDisplay = ({
  // Props for controlling slide display and interactions
  presentationId,
  selectedSlideId,
  isScreenLessThan1000,
  isScreenLessThan700,
}) => {
  // Component logic for rendering and handling slide interactions
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

  // Function to handle click event and set the anchor element
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('AnchorEl set in handleClick:', anchorEl);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedSlide]);

  // Function to handle selecting an element

  const handleSelectedElement = (element) => {
    setSelectedElement(element);
  };

  // Function to handle stopping the drag event of an element
  const onDragStop = (e, d, element) => {
    // Update the element position
    updateElementPosition(
      presentationId,
      selectedSlideId,
      element.id,
      `${(d.x / containerWidth) * 100}`,
      `${(d.y / containerHeight) * 100}`
    );

    // Update the selected element with new position
    setSelectedElement({
      ...element,
      top: `${(d.y / containerHeight) * 100}`,
      left: `${(d.x / containerWidth) * 100}`,
    });
  };

  // Function to handle stopping the resize event of an element
  const onResizeStop = (e, direction, ref, delta, position, element) => {
    // Calculate new size and position
    const newSize = {
      width: `${(ref.offsetWidth / containerWidth) * 100}`,
      height: `${(ref.offsetHeight / containerHeight) * 100}`,
    };
    const newPosition = {
      top: `${(position.y / containerHeight) * 100}`,
      left: `${(position.x / containerWidth) * 100}`,
    };
    // Update element size and position
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
    // Update selected element with new size and position
    setSelectedElement({ ...element, ...newSize, ...newPosition });
  };

  // Function to handle deleting an element from the slide
  const handleDeleteElement = (elementId, e) => {
    e.preventDefault();
    // Check if the selected element is being deleted
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
    // Delete the element from the slide
    deleteElementFromSlide(presentationId, selectedSlideId, elementId);
  };

  // Function to render corner boxes around selected element
  const renderCornerBoxes = useCallback(
    (element) => {
      // Check if an element is selected
      if (selectedElement === null || selectedElement.id !== element.id) {
        return null;
      }
      const elementWidthPx =
        (parseInt(selectedElement.width) / 100) * containerWidth;
      const elementHeightPx =
        (parseInt(selectedElement.height) / 100) * containerHeight;

      // Calculate corner positions based on element size
      const corners = [
        { top: 0, left: 0 }, // Top-left
        { top: 0, left: 0 + elementWidthPx - 10 }, // Top-right-
        { top: 0 + elementHeightPx - 10, left: 0 }, // Bottom-left
        {
          top: 0 + elementHeightPx - 10,
          left: 0 + elementWidthPx - 10,
        }, // Bottom-right
      ];

      // Render corner boxes
      return corners.map((style, index) => (
        <CornerBox key={index} style={style} />
      ));
    },
    [selectedElement]
  );

  // Function to get elements of the selected slide
  const getElements = () => {
    // Check if the selected slide has elements
    if (selectedSlide?.elements?.length) {
      const lastElementObj =
        selectedSlide.elements[selectedSlide.elements.length - 1];

      // Extract element key and values
      const key = Object.keys(lastElementObj)[0];
      const values = lastElementObj[key];

      return values;
    } else {
      return [];
    }
  };

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
    handleOpenCreateTextBox();
  };

  const handleAddImageOnSlide = () => {
    setAnchorEl(null);
    handleOpenImageHandler();
  };

  const handleAddVideoOnSlide = () => {
    setAnchorEl(null);
    handleOpenVideoHandler();
  };

  const handleAddCodeOnSlide = () => {
    setAnchorEl(null);
    handleOpenCodeHandler();
  };

  const handleOpenSlideHistory = () => {
    setAnchorEl(null);
    handleOpenSlideHistoryHandler();
  };

  const handleOpenColourPalette = () => {
    setAnchorEl(null);
    handleOpenColourPaletteHandler();
  };

  // Debug: Log the value right before passing it to EditMenu
  console.log('AnchorEl before passing to EditMenu:', anchorEl);
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
        backgroundImage: selectedSlide?.bgCol
          ? selectedSlide?.bgCol
          : `linear-gradient(${'to bottom right'}, ${'#999'}, ${'#999'})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {getElements().map((element) => {
        return (
          <GetElement
            key={element.id}
            element={element}
            presentationId={presentationId}
            handleDeleteElement={handleDeleteElement}
            selectedSlideId={selectedSlideId}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            renderCornerBoxes={renderCornerBoxes}
            handleSelectedElement={handleSelectedElement}
          />
        );
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
      <ModalManager
        openCreateTextBox={openCreateTextBox}
        handleCloseCreateTextBox={handleCloseCreateTextBox}
        openImageHandler={openImageHandler}
        handleCloseImageHandler={handleCloseImageHandler}
        openVideoHandler={openVideoHandler}
        handleCloseVideoHandler={handleCloseVideoHandler}
        openCodeHandler={openCodeHandler}
        handleCloseCodeHandler={handleCloseCodeHandler}
        OpenSlideHistoryHandler={OpenSlideHistoryHandler}
        handleCloseSlideHistoryHandler={handleCloseSlideHistoryHandler}
        OpenSlideColourPalette={OpenSlideColourPalette}
        handleCloseSlideColourPalette={handleCloseSlideColourPalette}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
    </div>
  );
};

export default SlideDisplay;
