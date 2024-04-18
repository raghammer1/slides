import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TextBoxPreview from '../../PreviewPresentation/PreviewElementDisplay/TextBoxPreview';
import ImagePreview from '../../PreviewPresentation/PreviewElementDisplay/ImagePreview';
import VideoPreview from '../../PreviewPresentation/PreviewElementDisplay/VideoPreview';
import { Typography } from '@mui/material';
import CodePreview from '../../PreviewPresentation/PreviewElementDisplay/CodePreview';
import { styled } from '@mui/system';

const ReArrangeSlideCard = ({ id, slide }) => {
  const Card = styled('div')({
    width: '300px',
    height: '150px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px #333 solid',
    backgroundImage: slide.bgCol
      ? slide.bgCol
      : 'linear-gradient(to bottom right, #999, #999)',
    borderRadius: '9px',
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id.toString() }); // Hooks into DnD Kit's sortable functionality.

  const style = {
    transform: CSS.Transform.toString(transform), // Applies CSS transformations for drag motion.
    transition,
  };

  const getElements = (selectedSlide) => {
    if (selectedSlide?.elements?.length) {
      const lastElementObj =
        selectedSlide.elements[selectedSlide.elements.length - 1];
      const key = Object.keys(lastElementObj)[0];
      return lastElementObj[key];
    }
    return [];
  };

  const size = { width: 200, height: 100 };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, marginBottom: '20px' }}
      {...attributes}
      {...listeners}
    >
      <Card>
        {getElements(slide).map((element) => {
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
          } else if (element.type === 'code') {
            return (
              <CodePreview key={element.id} element={element} size={size} />
            );
          }
          return null;
        })}
      </Card>
      <Typography>Slide: {slide.slideNumber}</Typography>
    </div>
  );
};

export default ReArrangeSlideCard;
