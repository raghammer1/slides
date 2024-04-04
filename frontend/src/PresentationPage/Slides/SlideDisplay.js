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
        position: 'relative',
      }}
    >
      <div>
        Slide: {selectedSlide.slideNumber} and id: {selectedSlide.id}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
