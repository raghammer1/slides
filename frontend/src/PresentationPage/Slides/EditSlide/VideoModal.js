import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import { Tooltip, Typography } from '@mui/material';
import InputWithLabels from '../../../components/InputLabel';
import { v4 as uuidv4 } from 'uuid';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import InputLabelRange from '../../../components/InputLabelRange';
import usePresentationListStore from '../../../zustandStore/usePresentationListStore';

//  Custom Styling for this element.
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

// Modal for adding video elements to a slide.
const VideoModal = ({
  open,
  handleCloseVideoHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  const [videoUrl, setVideoUrl] = useState(null); // State for the video URL.
  const [autoplay, setAutoplay] = useState(false); // State for autoplay option.

  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('50'); // Width of the video element.
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('50'); // Height of the video element.

  const { addElementToSlide } = usePresentationListStore(); // Access store to use the action.

  // Function to handle the creation of a new video element.
  const handlePresentationTitleCreateImage = () => {
    const idElements = uuidv4(); // Generate a unique ID for the new element.
    const element = {
      id: idElements,
      type: 'video',
      src: videoUrl,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      autoplay,
      controls: true, // Always provide controls for video elements.
    };
    addElementToSlide(presentationId, selectedSlideId, element); // Add the new video to the slide.
    setVideoUrl(null); // Reset the video URL state.
    handleCloseVideoHandler(); // Close the modal.
    setAnchorEl(null); // Reset the anchor element.
  };

  // Handle changes to the autoplay checkbox.
  const handleAutoplayChange = (event) => {
    setAutoplay(event.target.checked);
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseVideoHandler}
      style={style}
    >
      <Typography style={{ fontSize: '24px', color: '#fff' }}>
        Set Video
      </Typography>
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
