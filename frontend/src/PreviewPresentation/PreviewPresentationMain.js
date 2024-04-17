import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePresentationListStore, {
  initializeStore,
} from '../zustandStore/usePresentationListStore';
import TextBoxPreview from './PreviewElementDisplay/TextBoxPreview';
import ImagePreview from './PreviewElementDisplay/ImagePreview';
import VideoPreview from './PreviewElementDisplay/VideoPreview';
import CodePreview from './PreviewElementDisplay/CodePreview';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import { styled } from '@mui/system';

const PageNumber = styled('div')({
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 99999,
  color: '#f3f3f3',
  background: 'rgba(0, 0, 0, 0.4)',
  padding: '2px 5px',
  borderRadius: '4px',
  fontSize: '1rem',
});

const Wrapper = styled('div')({
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
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

  const nav = useNavigate();
  const { id, slideNumberURL } = useParams();
  const slides = usePresentationListStore((state) =>
    state.getSlidesForPresentation(id)
  );
  const [currSlideNumber, setCurrSlideNumber] = useState(
    parseInt(slideNumberURL) || 0
  );
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
    const handleKeyDown = (event) => {
      let newSlideNumber = currSlideNumber;
      if (event.key === 'ArrowRight' && currSlideNumber < slides.length - 1) {
        newSlideNumber = currSlideNumber + 1;
      } else if (event.key === 'ArrowLeft' && currSlideNumber > 0) {
        newSlideNumber = currSlideNumber - 1;
      }

      if (newSlideNumber !== currSlideNumber) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrSlideNumber(newSlideNumber);
          setIsVisible(true);
          nav(`/preview/${id}/${newSlideNumber}`);
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currSlideNumber, slides.length, id, nav]);

  useEffect(() => {
    Prism.highlightAll();
  }, [currSlideNumber, id, slides.length]);

  const getElements = (selectedSlide) => {
    if (selectedSlide?.elements?.length) {
      const lastElementObj =
        selectedSlide.elements[selectedSlide.elements.length - 1];
      const key = Object.keys(lastElementObj)[0];
      return lastElementObj[key];
    }
    return [];
  };

  return (
    <Wrapper ref={parentRef}>
      {slides.map((slide, index) => (
        <SlideContainer
          style={{
            backgroundImage: slide.bgCol
              ? slide.bgCol
              : 'linear-gradient(to bottom right, #999, #999)',
          }}
          key={slide.id}
          isVisible={index === currSlideNumber && isVisible}
        >
          {getElements(slide).map((element) => {
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
            return null;
          })}
          <PageNumber>{index + 1}</PageNumber>
        </SlideContainer>
      ))}
    </Wrapper>
  );
};

export default PreviewPresentationMain;
