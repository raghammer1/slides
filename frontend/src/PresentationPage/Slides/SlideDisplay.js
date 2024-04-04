import React from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';

const SlideDisplay = ({ presentationId, selectedSlideId }) => {
  const { selectedSlide } = useSlidesListStore((store) => ({
    selectedSlide: store.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
  }));

  return (
    <div
      style={{
        width: '1000px',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
        position: 'relative', // Needed to position children absolutely within
      }}
    >
      {/* Main content of the slide */}
      <div>
        Slide: {selectedSlide.slideNumber} and id: {selectedSlide.id}
      </div>

      {/* Positioned slide number on the bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          color: '#fff', // Assuming a dark background, white text will stand out
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Adds a semi-transparent background to the text for better readability
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        {selectedSlide.slideNumber}
      </div>
    </div>
  );
};

export default SlideDisplay;
