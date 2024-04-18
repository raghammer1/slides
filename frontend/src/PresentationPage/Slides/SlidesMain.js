import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SlidesList from './SlidesList';
import SlideDisplay from './SlideDisplay';
import SlideControlArrows from './SlideControlArrows';
import DeletePresentationModal from '../DeletePresentationModal';
import { useNavigate } from 'react-router-dom';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import { useAlert } from '../../components/AlertError';

// Styled component for the main wrapper
const Wrapper = styled('div')({
  width: '90vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px',
  '@media (max-width: 1430px)': {
    flexDirection: 'column',
  },
});

// The main component for presentation slides interface
const SlidesMain = ({
  presentationId,
  isNarrowScreen,
  isScreenLessThan1000,
  isScreenLessThan700,
}) => {
  const {
    slides,
    deleteSlide,
    startTimer,
    stopTimer,
    getElapsedTime,
    version,
  } = usePresentationListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    deleteSlide: state.deleteSlide,
    startTimer: state.startTimer,
    stopTimer: state.stopTimer,
    getElapsedTime: state.getElapsedTime,
    version: state.version,
  }));

  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const selectedSlideId = selectedSlide.id;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (
      !selectedSlide ||
      !slides.find((slide) => slide.id === selectedSlide.id)
    ) {
      setSelectedSlide(slides[0] || null);
    }
  }, [slides, selectedSlide, setSelectedSlide, version]);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [selectedSlideId, startTimer, stopTimer, getElapsedTime, version]);

  const nav = useNavigate();
  const handleDeleteSlide = (slide) => {
    if (slides.length === 1) {
      handleOpen();
      return;
    }
    if (selectedSlideId === slide.id) {
      if (slide.slideNumber === 1 && slides.length > 1) {
        setSelectedSlide(slides[1]);
      } else if (slides.length > 1) {
        setSelectedSlide(slides[slide.slideNumber - 2]);
      }
    }
    showAlert('Slide successfully deleted', 'tomato');
    deleteSlide(presentationId, slide.id);
  };

  const { deleteOnePresentation } = usePresentationListStore();

  const handlePresentationDelete = () => {
    setOpen(false);
    deleteOnePresentation(presentationId);
    showAlert('Presentation Successfully Deleted', 'tomato');
    nav('/dashboard');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Wrapper>
        <SlidesList
          selectedSlide={selectedSlide}
          isNarrowScreen={isNarrowScreen}
          presentationId={presentationId}
          setSelectedSlide={setSelectedSlide}
          selectedSlideId={selectedSlideId}
          handleDeleteSlide={handleDeleteSlide}
        />
        <SlideDisplay
          isScreenLessThan1000={isScreenLessThan1000}
          isScreenLessThan700={isScreenLessThan700}
          presentationId={presentationId}
          selectedSlideId={selectedSlideId}
        />
      </Wrapper>
      <SlideControlArrows
        presentationId={presentationId}
        setSelectedSlide={setSelectedSlide}
        selectedSlideId={selectedSlideId}
      />
      <DeletePresentationModal
        dataTestid={'delete-presentation-delete-slide'}
        open={open}
        handleClose={handleClose}
        handlePresentationDelete={handlePresentationDelete}
      />
    </div>
  );
};

export default SlidesMain;
