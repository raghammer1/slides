/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import { Tooltip } from '@mui/material';
import InputWithLabels from '../../../components/InputLabel';
import { v4 as uuidv4 } from 'uuid';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import InputLabelRange from '../../../components/InputLabelRange';
import usePresentationListStore from '../../../zustandStore/usePresentationListStore';

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

const VideoModal = ({
  open,
  handleCloseVideoHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [autoplay, setAutoplay] = useState(false);

  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('50');

  const { addElementToSlide } = usePresentationListStore();

  const handlePresentationTitleCreateImage = () => {
    const idElements = uuidv4();
    const element = {
      id: idElements,
      type: 'video',
      src: videoUrl,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      autoplay,
      controls: true,
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setVideoUrl(null);
    handleCloseVideoHandler();
    setAnchorEl(null);
  };

  const handleAutoplayChange = (event) => {
    setAutoplay(event.target.checked);
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseVideoHandler}
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
      <InputLabelRange
        value={sizeTextBoxWidth}
        setValue={setSizeTextBoxWidth}
        label={'Width'}
        max={'100'}
        min={'0'}
        sign={'%'}
        customeStyle={{ marginTop: '20px' }}
      />
      <InputLabelRange
        value={sizeTextBoxHeight}
        setValue={setSizeTextBoxHeight}
        label="Height"
        max={'100'}
        min={'0'}
        sign={'%'}
      />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <h3 style={{ color: '#A6D8FF' }}>AutoPlay</h3>
        <input
          data-testid={'autoplay-checkbox-btn'}
          type="checkbox"
          checked={autoplay}
          onChange={handleAutoplayChange}
        />
      </div>
      <Tooltip title={videoUrl === null ? 'Give a valid url' : 'submit video'}>
        <div>
          <CustomPrimaryButton
            dataTestid={'create-new-video-box-btn'}
            disabled={videoUrl === null}
            label="Create Now"
            additionalStyle={{ marginTop: '30px' }}
            onClick={handlePresentationTitleCreateImage}
          />
        </div>
      </Tooltip>
    </CustomModal>
  );
};
export default VideoModal;
