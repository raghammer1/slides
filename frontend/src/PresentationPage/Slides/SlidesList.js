import React from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import { v4 as uuidv4 } from 'uuid';

const SlidesList = ({ presentationId, setSelectedSlide }) => {
  const { slides, addSlide } = useSlidesListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    addSlide: state.addSlide,
  }));

  const handleAddNewSlide = () => {
    const newSlide = {
      id: uuidv4(),
    };
    addSlide(presentationId, newSlide);
  };

  return (
    <div
      style={{
        overflow: 'auto',
        height: '500px',
      }}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          onClick={() => setSelectedSlide(slide)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f0f0f0',
            width: '250px',
          }}
        >
          Slide {slide.slideNumber} - {slide.id}
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
      >
        Add Slide +
      </div>
    </div>
  );
};

export default SlidesList;
