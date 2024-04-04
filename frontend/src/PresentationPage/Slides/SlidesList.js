// import React from 'react';
// import useSlidesListStore from '../../zustandStore/useSlidesListStore';
// import { v4 as uuidv4 } from 'uuid';
// import DeleteIcon from '@mui/icons-material/Delete'; // Importing MUI Delete icon
// import IconButton from '@mui/material/IconButton'; // Importing MUI IconButton for clickable icons

// const SlidesList = ({ selectedSlideId, presentationId, setSelectedSlide }) => {
//   const { slides, addSlide } = useSlidesListStore((state) => ({
//     slides: state.getSlidesForPresentation(presentationId),
//     addSlide: state.addSlide,
//   }));

//   const handleAddNewSlide = () => {
//     const newSlide = {
//       id: uuidv4(),
//     };
//     addSlide(presentationId, newSlide);
//   };

//   return (
//     <div
//       style={{
//         overflow: 'auto',
//         height: '500px',
//       }}
//     >
//       {slides.map((slide) => (
//         <div
//           key={slide.id}
//           onClick={() => setSelectedSlide(slide)}
//           style={{
//             cursor: 'pointer',
//             padding: '10px',
//             margin: '5px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             backgroundColor:
//               slide.id === selectedSlideId ? '#aaf0d1' : '#f0f0f0',
//             width: '250px',
//           }}
//         >
//           Slide {slide.slideNumber} - {slide.id}
//         </div>
//       ))}
//       <div
//         onClick={handleAddNewSlide}
//         style={{
//           cursor: 'pointer',
//           padding: '10px',
//           margin: '5px',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           backgroundColor: '#f0f0f0',
//           width: '250px',
//         }}
//       >
//         Add Slide +
//       </div>
//     </div>
//   );
// };

// export default SlidesList;
import React from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const SlidesList = ({
  selectedSlideId,
  presentationId,
  setSelectedSlide,
  handleDeleteSlide,
}) => {
  const { slides, addSlide } = useSlidesListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    addSlide: state.addSlide,
  }));

  const handleAddNewSlide = () => {
    const newSlide = {
      id: uuidv4(),
    };
    addSlide(presentationId, newSlide);
  };

  return (
    <div style={{ overflow: 'auto', height: '500px' }}>
      {slides.map((slide) => (
        <div
          key={slide.id}
          onClick={() => setSelectedSlide(slide)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor:
              slide.id === selectedSlideId ? '#aaf0d1' : '#f0f0f0',
            width: '250px',
          }}
        >
          <span>
            Slide {slide.slideNumber} - {slide.id}
          </span>
          <IconButton onClick={(e) => handleDeleteSlide(e, slide)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
      <div
        onClick={handleAddNewSlide}
        style={{
          cursor: 'pointer',
          padding: '10px',
          margin: '5px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f0f0f0',
          width: '250px',
        }}
      >
        Add Slide +
      </div>
    </div>
  );
};

export default SlidesList;
