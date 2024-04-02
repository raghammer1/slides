import React from 'react';
const SlidesMain = (slides) => {
  console.log(slides.slides[0]);
  return <div>{slides.slides[0].name}</div>;
};
export default SlidesMain;
