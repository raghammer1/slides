import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ReArrangeSlideCard from './ReArrangeSlideCard';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';

// Styled wrapper for the re-arrange slides page, aligning content centrally with significant gap.
const Wrapper = styled('div')({
  display: 'flex',
  alignContent: 'flex-start',
  justifyContent: 'center',
  gap: '300px',
  marginTop: '20px',
  '@media (max-width: 750px)': {
    gap: '100px',
  },
  '@media (max-width: 550px)': {
    gap: '50px',
    flexDirection: 'column-reverse',
  },
});

// Main component for re-arranging slides within a presentation.
const ReArrangeMainPage = () => {
  const { id } = useParams(); // Retrieves the current presentation ID from the URL.
  const nav = useNavigate();
  const { zustandSlides, setSlidesForPresentation } = usePresentationListStore(
    (state) => ({
      zustandSlides: state.getSlidesForPresentation(id), // Fetches slides for the specified presentation.
      setSlidesForPresentation: state.setSlidesForPresentation,
    })
  );

  // Local state to manage slides.
  const [slides, setSlides] = useState(zustandSlides);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handles drag and drop events for slide re-arrangement.
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = slides.findIndex((slide) => slide.id === active.id);
      const newIndex = slides.findIndex((slide) => slide.id === over.id);
      setSlides(arrayMove(slides, oldIndex, newIndex));
    }
  };

  // Commits changes to the presentation store and navigates to the presentation view.
  const handleGoToSlideFunction = () => {
    setSlidesForPresentation(id, slides);
    nav(`/presentation/${id}`);
  };

  return (
    <Wrapper>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext
            items={slides.map((slide) => slide.id)}
            strategy={verticalListSortingStrategy}>
            {slides.map((slide) => (
              <ReArrangeSlideCard key={slide.id} id={slide.id} slide={slide} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <CustomPrimaryButton
        label="Close"
        additionalStyle={{ marginTop: '30px', width: '100px' }}
        onClick={handleGoToSlideFunction}
        dataTestid="login-button"
      />
    </Wrapper>
  );
};

export default ReArrangeMainPage;
