import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';

const SlideControlArrows = ({
  presentationId,
  setSelectedSlide,
  selectedSlideId,
}) => {
  const { slides, selectedSlide } = useSlidesListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    selectedSlide: state.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
  }));
  // ! STILL NEED TO ADD KEYBOARD COMMANDS
  const totalSlides = slides.length;

  const handlePrev = () => {
    const slide = slides.find(
      (s) => s.slideNumber === selectedSlide.slideNumber - 1
    );
    setSelectedSlide(slide);
  };

  const handleNext = () => {
    const slide = slides.find(
      (s) => s.slideNumber === selectedSlide.slideNumber + 1
    );
    setSelectedSlide(slide);
  };

  console.log(slides, totalSlides);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        onClick={handlePrev}
        disabled={selectedSlide.slideNumber === 1}
        aria-label="previous slide"
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={selectedSlide.slideNumber === totalSlides}
        aria-label="next slide"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default SlideControlArrows;
