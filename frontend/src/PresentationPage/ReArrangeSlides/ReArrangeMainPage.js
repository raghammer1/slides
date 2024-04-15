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
// import { SortableItem } from './SortableItem';
import ReArrangeSlideCard from './ReArrangeSlideCard';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';

const Wrapper = styled('div')({
  display: 'flex',
  alignContent: 'flex-start',
  justifyContent: 'center',
  gap: '300px',
});

const ReArrangeMainPage = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { zustandSlides, setSlidesForPresentation } = usePresentationListStore(
    (state) => ({
      zustandSlides: state.getSlidesForPresentation(id),
      setSlidesForPresentation: state.setSlidesForPresentation,
    })
  );

  const [slides, setSlides] = useState(zustandSlides);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = slides.findIndex((slide) => slide.id === active.id);
      const newIndex = slides.findIndex((slide) => slide.id === over.id);
      setSlides(arrayMove(slides, oldIndex, newIndex));
    }
  };

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
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={slides.map((slide) => slide.id)}
            strategy={verticalListSortingStrategy}
          >
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
