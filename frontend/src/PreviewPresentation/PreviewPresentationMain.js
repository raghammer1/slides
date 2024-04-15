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
  backgroundColor: '#f1f1f1',
});

const SlideContainer = styled('div')(({ theme, isVisible }) => ({
  transition: 'opacity 0.5s',
  opacity: isVisible ? 1 : 0,
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
}));

const PreviewPresentationMain = () => {
  useEffect(() => {
    initializeStore();
  }, []);

  const { id } = useParams();
  const { getSlidesForPresentation } = usePresentationListStore();
  const slides = getSlidesForPresentation(id);

  const [currSlideNumber, setCurrSlideNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
      if (event.key === 'ArrowRight' && currSlideNumber < slides.length - 1) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrSlideNumber(currSlideNumber + 1);
          setIsVisible(true);
        }, 500); // match the timeout with your transition duration
      } else if (event.key === 'ArrowLeft' && currSlideNumber > 0) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrSlideNumber(currSlideNumber - 1);
          setIsVisible(true);
        }, 500); // match the timeout with your transition duration
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currSlideNumber, slides.length]); // Make sure to include isVisible in dependencies if you experience issues

  useEffect(() => {
    Prism.highlightAll();
  }, [currSlideNumber, id, slides.length]);

  return (
    <Wrapper ref={parentRef}>
      {slides.map((slide, index) => (
        <SlideContainer
          key={slide.id}
          isVisible={index === currSlideNumber && isVisible}
        >
          {slide.elements.map((element) => {
            // Your element handling logic here
            if (element.type === 'textarea') {
              return (
                <TextBoxPreview
                  key={element.id}
                  element={element}
                  size={size}
                />
              );
            } else if (element.type === 'image') {
              return (
                <ImagePreview key={element.id} element={element} size={size} />
              );
            } else if (element.type === 'video') {
              return (
                <VideoPreview key={element.id} element={element} size={size} />
              );
            } else if (element.type === 'code') {
              return (
                <CodePreview key={element.id} element={element} size={size} />
              );
            }
            return <></>;
          })}
        </SlideContainer>
      ))}
    </Wrapper>
  );
};

export default PreviewPresentationMain;
