import React from 'react';
import TextBoxPreview from '../../../../PreviewPresentation/PreviewElementDisplay/TextBoxPreview';
import ImagePreview from '../../../../PreviewPresentation/PreviewElementDisplay/ImagePreview';
import VideoPreview from '../../../../PreviewPresentation/PreviewElementDisplay/VideoPreview';
import CodePreview from '../../../../PreviewPresentation/PreviewElementDisplay/CodePreview';
import CustomPrimaryButton from '../../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';

const SlidePreview = ({
  presentationId,
  selectedSlideId,
  selectedSlideHistory,
  handleClosePreviewHandler,
}) => {
  const key = Object.keys(selectedSlideHistory)[0];
  const value = selectedSlideHistory[key];
  console.log(value);

  const size = { width: 800, height: 400 };
  console.log(value, 'VALUE');

  const addElementToObject = usePresentationListStore(
    (state) => state.addElementToObject
  );

  const handleSelectThisVersion = () => {
    addElementToObject(presentationId, selectedSlideId, value);
    handleClosePreviewHandler();
  };

  return (
    <div>
      <h2 style={{ marginTop: '0' }}>
        Are you sure you want to go to this version?
      </h2>
      <div
        style={{
          width: '800px',
          height: '400px',
          position: 'relative',
          backgroundColor: '#f2f2f2',
          overflow: 'hidden',
        }}
      >
        {value.map((element) => {
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
          return <></>;
        })}
      </div>
      <div>
        <CustomPrimaryButton
          label="Cancel"
          additionalStyle={{ marginTop: '30px' }}
          onClick={handleClosePreviewHandler}
          dataTestid="login-button"
        />
        <CustomPrimaryButton
          label="Confirm"
          additionalStyle={{ marginTop: '30px' }}
          onClick={handleSelectThisVersion}
          dataTestid="login-button"
        />
      </div>
    </div>
  );
};
export default SlidePreview;
