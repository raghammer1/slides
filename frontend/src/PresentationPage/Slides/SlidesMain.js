import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SlidesList from './SlidesList';
import SlideDisplay from './SlideDisplay';
import SlideControlArrows from './SlideControlArrows';
import DeletePresentationModal from '../DeletePresentationModal';
import { useNavigate } from 'react-router-dom';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import { useAlert } from '../../components/AlertError';

const Wrapper = styled('div')({
  width: '90vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px',
});

const SlidesMain = ({ presentationId }) => {
  const { slides, deleteSlide, startTimer, stopTimer, getElapsedTime } =
    usePresentationListStore((state) => ({
      slides: state.getSlidesForPresentation(presentationId),
      deleteSlide: state.deleteSlide,
      startTimer: state.startTimer,
      stopTimer: state.stopTimer,
      getElapsedTime: state.getElapsedTime,
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
  }, [slides, selectedSlide, setSelectedSlide]);

  useEffect(() => {
    // When a slide is selected, start the timer
    startTimer();

    return () => {
      // When the slide changes or the component unmounts, stop the timer
      stopTimer();
      console.log(`Elapsed Time: ${getElapsedTime()}ms`);
    };
  }, [selectedSlideId, startTimer, stopTimer, getElapsedTime]);

  const nav = useNavigate();
  const handleDeleteSlide = (e, slide) => {
    e.stopPropagation();
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
    deleteSlide(presentationId, slide.id);
  };

  const { deleteOnePresentation } = usePresentationListStore();

  const handlePresentationDelete = () => {
    console.log('delete');
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
      }}
    >
      <Wrapper>
        <SlidesList
          presentationId={presentationId}
          setSelectedSlide={setSelectedSlide}
          selectedSlideId={selectedSlideId}
          handleDeleteSlide={handleDeleteSlide}
        />
        <SlideDisplay
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
