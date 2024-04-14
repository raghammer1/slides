import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';

const SlidesList = ({
  selectedSlideId,
  presentationId,
  setSelectedSlide,
  handleDeleteSlide,
}) => {
  const { slides, addSlide } = usePresentationListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    addSlide: state.addSlide,
  }));

  const handleAddNewSlide = () => {
    const newSlide = {
      id: uuidv4(),
      // historyTime: 0,
      elements: [],
    };
    addSlide(presentationId, newSlide);
  };

  return (
    <div style={{ overflow: 'auto', height: '500px' }}>
      {slides.map((slide) => (
        <div
          key={slide.id}
          onClick={() => setSelectedSlide(slide)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor:
              slide.id === selectedSlideId ? '#aaf0d1' : '#f0f0f0',
            width: '250px',
          }}
          data-testid={`data-test-slide-${slide.id}`}
        >
          <span>
            Slide {slide.slideNumber} - {slide.id}
          </span>
          <IconButton
            data-testid={`slide-delete-btn-test-${slide.id}`}
            onClick={(e) => handleDeleteSlide(e, slide)}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
      <div
        onClick={handleAddNewSlide}
        style={{
          cursor: 'pointer',
          padding: '10px',
          margin: '5px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f0f0f0',
          width: '250px',
        }}
        data-testid={'add-slide-button'}
      >
        Add Slide +
      </div>
    </div>
  );
};

export default SlidesList;
