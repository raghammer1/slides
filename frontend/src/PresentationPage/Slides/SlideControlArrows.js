import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';

const SlideControlArrows = ({
  presentationId,
  setSelectedSlide,
  selectedSlideId,
}) => {
  const { slides, selectedSlide } = usePresentationListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    selectedSlide: state.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
  }));

  const totalSlides = slides.length;

  const canNavigatePrev = selectedSlide.slideNumber > 1;
  const canNavigateNext = selectedSlide.slideNumber < totalSlides;

  const handlePrev = () => {
    if (canNavigatePrev) {
      const slide = slides.find(
        (s) => s.slideNumber === selectedSlide.slideNumber - 1
      );
      setSelectedSlide(slide);
    }
  };

  const handleNext = () => {
    if (canNavigateNext) {
      const slide = slides.find(
        (s) => s.slideNumber === selectedSlide.slideNumber + 1
      );
      setSelectedSlide(slide);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' && canNavigatePrev) {
        handlePrev();
      } else if (event.key === 'ArrowRight' && canNavigateNext) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canNavigatePrev, canNavigateNext, handlePrev, handleNext]);

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
