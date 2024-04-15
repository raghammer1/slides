import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePresentationListStore from '../zustandStore/usePresentationListStore';

const PreviewPresentationMain = () => {
  const { id } = useParams();
  const { getSlidesForPresentation } = usePresentationListStore();
  const slides = getSlidesForPresentation(id);
  const [currSlideNumber, setCurrSlideNumber] = useState(0);

  useEffect(() => {
    setCurrSlideNumber(0);
  }, [id, slides.length]); // Also depends on slides.length to reset if slides change

  // Key press event handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrSlideNumber((prev) =>
          prev < slides.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === 'ArrowLeft') {
        setCurrSlideNumber((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slides.length]); // Dependency on slides.length ensures updates if slide count changes

  return (
    <div>
      <div>{id}</div>
      {slides[currSlideNumber]?.elements?.map((element) => (
        <div key={element.id}>HJ</div>
      ))}
    </div>
  );
};

export default PreviewPresentationMain;
