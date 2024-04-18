/* eslint-disable space-before-function-paren */
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';

// Styled card component for displaying an individual slide during re-arrangement.
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 200px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
// Individual slide card component for re-arrangement interface.
function ReArrangeSlideCard({ id, slide }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id.toString() }); // Hooks into DnD Kit's sortable functionality.

  const style = {
    transform: CSS.Transform.toString(transform), // Applies CSS transformations for drag motion.
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>Slide {slide.slideNumber}</Card>
    </div>
  );
}

export default ReArrangeSlideCard;
