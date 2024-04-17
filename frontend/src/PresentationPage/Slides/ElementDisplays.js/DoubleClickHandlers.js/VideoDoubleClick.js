import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import InputWithLabels from '../../../../components/InputLabel';
import CustomPrimaryButton from '../../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VideoDoubleClick = ({
  open,
  handleCloseEditTextBox,
  presentationId,
  selectedSlideId,
  element,
}) => {
  const [videoUrl, setVideoUrl] = useState(element.src);
  const [autoplay, setAutoplay] = useState(element.autoplay);

  const updateElementInSlide = usePresentationListStore(
    (state) => state.updateElementInSlide
  );

  const handleAutoplayChange = (event) => {
    setAutoplay(event.target.checked);
  };

  const handleSaveVidEdit = () => {
    updateElementInSlide(presentationId, selectedSlideId, element.id, {
      src: videoUrl,
      autoplay,
    });
    handleCloseEditTextBox();
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseEditTextBox}
      style={style}
    >
      <InputWithLabels
        dataTestId={'title-video-url-box-test'}
        value={videoUrl}
        setValue={setVideoUrl}
        type="Video URL"
        placeholder="Enter Video URL"
        label="Video URL"
      />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <h3>AutoPlay</h3>
        <input
          data-testid={'autoplay-checkbox-btn'}
          type="checkbox"
          checked={autoplay}
          onChange={handleAutoplayChange}
        />
      </div>
      <div>
        <CustomPrimaryButton
          dataTestid={'create-new-video-box-btn'}
          label="Create Now"
          additionalStyle={{ marginTop: '30px' }}
          onClick={handleSaveVidEdit}
        />
      </div>
    </CustomModal>
  );
};
export default VideoDoubleClick;
