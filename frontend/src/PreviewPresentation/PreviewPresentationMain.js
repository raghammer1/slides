import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePresentationListStore, {
  initializeStore,
} from '../zustandStore/usePresentationListStore';
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
  useEffect(() => {
    initializeStore(); // Make sure this is called on app start
  }, []);

  const { id } = useParams();
  const { getSlidesForPresentation } = usePresentationListStore();
  const slides = getSlidesForPresentation(id);
  const [currSlideNumber, setCurrSlideNumber] = useState(0);

  const parentRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);

  useEffect(() => {
    setCurrSlideNumber(0);
  }, [id, slides.length]);

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
  }, [slides.length]);

  useEffect(() => {
    Prism.highlightAll();
  }, [currSlideNumber, id, slides.length]);

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
