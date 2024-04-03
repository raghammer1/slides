import React from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';

const SlidesMain = ({ presentationId }) => {
  const getSlidesForPresentation = useSlidesListStore(
    (state) => state.getSlidesForPresentation
  );
  const slides = getSlidesForPresentation(presentationId);

  console.log(slides[0]);
  return <div>{slides[0].name}</div>;
};
export default SlidesMain;
