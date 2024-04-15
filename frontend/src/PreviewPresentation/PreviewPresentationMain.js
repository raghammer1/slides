import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import TextBoxPreview from './PreviewElementDisplay/TextBoxPreview';
import ImagePreview from './PreviewElementDisplay/ImagePreview';
import { styled } from '@mui/system';
import VideoPreview from './PreviewElementDisplay/VideoPreview';
import CodePreview from './PreviewElementDisplay/CodePreview';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';

const Wrapper = styled('div')({
  height: '100vh',
  width: '100vw',
  position: 'relative',
});

const PreviewPresentationMain = () => {
  Prism.highlightAll();
  const { id } = useParams();
  const { getSlidesForPresentation } = usePresentationListStore();
  const slides = getSlidesForPresentation(id);
  const [currSlideNumber, setCurrSlideNumber] = useState(0);

  const parentRef = useRef(null); // Step 1: Create the ref
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect(); // Using getBoundingClientRect
      setSize({ width, height });
    }
  }, []); // Empty dependency array means this runs once after the initial render

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
    <Wrapper ref={parentRef}>
      {slides[currSlideNumber]?.elements?.map((element) => {
        if (element.type === 'textarea') {
          return (
            <TextBoxPreview key={element.id} element={element} size={size} />
          );
        } else if (element.type === 'image') {
          return (
            <ImagePreview key={element.id} element={element} size={size} />
          );
        } else if (element.type === 'video') {
          return (
            <VideoPreview key={element.id} element={element} size={size} />
          );
        }
        if (element.type === 'code') {
          return <CodePreview key={element.id} element={element} size={size} />;
        } else {
          return <></>;
        }
      })}
    </Wrapper>
  );
};

export default PreviewPresentationMain;
