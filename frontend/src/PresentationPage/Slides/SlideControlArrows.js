import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';

// Component for rendering navigation arrows for slide control
const SlideControlArrows = ({
  // Props for controlling slide navigation
  presentationId,
  setSelectedSlide,
  selectedSlideId,
}) => {
  // Get slides and selected slide from store
  const { slides, selectedSlide } = usePresentationListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    selectedSlide: state.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
  }));

  // Calculate total number of slides
  const totalSlides = slides.length;

  // Determine if navigation to previous and next slides is possible
  const canNavigatePrev = selectedSlide.slideNumber > 1;
  const canNavigateNext = selectedSlide.slideNumber < totalSlides;

  // Function to navigate to previous slide
  const handlePrev = () => {
    if (canNavigatePrev) {
      const slide = slides.find(
        (s) => s.slideNumber === selectedSlide.slideNumber - 1
      );
      setSelectedSlide(slide);
    }
  };

  // Function to navigate to next slide
  const handleNext = () => {
    if (canNavigateNext) {
      const slide = slides.find(
        (s) => s.slideNumber === selectedSlide.slideNumber + 1
      );
      setSelectedSlide(slide);
    }
  };

  // Add event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' && canNavigatePrev) {
        handlePrev();
      } else if (event.key === 'ArrowRight' && canNavigateNext) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canNavigatePrev, canNavigateNext, handlePrev, handleNext]);

  // Render navigation arrows
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        data-testid={'btn-go-left'}
        onClick={handlePrev}
        disabled={!canNavigatePrev}
        aria-label="previous slide"
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        data-testid={'btn-go-right'}
        onClick={handleNext}
        disabled={!canNavigateNext}
        aria-label="next slide"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default SlideControlArrows;
