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
import DeleteIcon from '@mui/icons-material/Delete'; // Importing MUI Delete icon
import IconButton from '@mui/material/IconButton'; // Importing MUI IconButton for clickable icons

const SlidesList = ({ selectedSlideId, presentationId, setSelectedSlide }) => {
  const { slides, addSlide, deleteSlide } = useSlidesListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    addSlide: state.addSlide,
    deleteSlide: state.deleteSlide, // Assuming this method exists for deleting a slide
  }));

  const handleAddNewSlide = () => {
    const newSlide = {
      id: uuidv4(),
    };
    addSlide(presentationId, newSlide);
  };

  const handleDeleteSlide = (e, slide) => {
    e.stopPropagation();
    if (selectedSlideId === slide.id) {
      if (slide.slideNumber === 1 && slides.length > 1) {
        setSelectedSlide(slides[1]);
      } else if (slides.length > 1) {
        setSelectedSlide(slides[slide.slideNumber - 2]);
      }
    }
    deleteSlide(presentationId, slide.id);
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
