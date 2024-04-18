import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import styled from '@emotion/styled';
import { useAlert } from '../../components/AlertError';

// Styled component for the slide container
const SlideContainer = styled.div`
  overflow: auto;
  height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Styled component for individual slide buttons
const SlideButton = styled.div`
  cursor: pointer;
  padding: 10px;
  margin: 5px;
  border: 1px solid #bbb;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#aaf0d1' : '#ffffff')};
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #888;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${({ isSelected }) =>
      isSelected ? '#92cbb2' : '#f9f9f9'};
  }

  transition: all 0.3s ease;
`;

// Styled component specifically for adding a new slide
const AddSlideButton = styled(SlideButton)`
  justify-content: center;
  background-color: #4caf50;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: #45a045;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

// Main component for displaying and managing slides
const SlidesList = ({
  selectedSlideId,
  presentationId,
  setSelectedSlide,
  selectedSlide,
  handleDeleteSlide,
  isNarrowScreen,
}) => {
  const { slides, addSlide } = usePresentationListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    addSlide: state.addSlide,
  }));

  const { showAlert } = useAlert();

  const handleAddNewSlide = () => {
    const newSlide = {
      id: uuidv4(), // Generate a unique ID for the new slide
      elements: [], // Initialize with no elements
    };
    showAlert('Slide successfully added', 'green');
    addSlide(presentationId, newSlide);
  };

  // Render differently based on screen width
  if (isNarrowScreen) {
    return (
      <>
        <AddSlideButton
          onClick={handleAddNewSlide}
          data-testid={'add-slide-button'}>
          Add Slide +
        </AddSlideButton>
        <IconButton
          data-testid={`slide-delete-btn-test-${selectedSlide.id}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteSlide(selectedSlide);
          }}
          size="small"
        >
          <p>Delete</p>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </>
    );
  }

  return (
    <SlideContainer>
      {slides.map((slide) => (
        <SlideButton
          key={slide.id}
          onClick={() => setSelectedSlide(slide)}
          isSelected={slide.id === selectedSlideId}
          data-testid={`data-test-slide-${slide.id}`}>
          <span style={{ marginLeft: '10px' }}>Slide {slide.slideNumber}</span>
          <IconButton
            data-testid={`slide-delete-btn-test-${slide.id}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSlide(slide);
            }}
            size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </SlideButton>
      ))}
      <AddSlideButton
        onClick={handleAddNewSlide}
        data-testid={'add-slide-button'}>
        Add Slide +
      </AddSlideButton>
    </SlideContainer>
  );
};

export default SlidesList;
