/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Tooltip,
  // TextField,
  // Button,
} from '@mui/material';
import InputWithLabels from '../../../components/InputLabel';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import InputLabelRange from '../../../components/InputLabelRange';
import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
import { imageEncoder } from '../../../shared/base64Image';

const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  marginTop: '20px',
  borderRadius: '5px',
});

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

const ImageModal = ({
  open,
  handleCloseImageHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  // State to manage toggle between URL input and image upload
  const [imageInputType, setImageInputType] = useState('url');

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);

  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('50');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      imageEncoder(file, (base64String) => {
        setSelectedFile(base64String);

        const img = new Image();
        img.onload = () => {
          const imageAspectRatio = img.naturalWidth / img.naturalHeight;

          const containerAspectRatio = 2 / 1;

          let scalePercentageWidth, scalePercentageHeight;

          if (imageAspectRatio > containerAspectRatio) {
            scalePercentageHeight = 'auto';
          } else {
            scalePercentageWidth = 'auto';
          }
          setSizeTextBoxWidth(scalePercentageWidth);
          setSizeTextBoxHeight(scalePercentageHeight);
        };
        img.src = base64String;
      });
    } else {
      setSelectedFile(null);
      alert('Please select an image file.');
    }
  };

  const { addElementToSlide } = useSlidesListStore();

  const handlePresentationTitleCreateImage = () => {
    const idElements = uuidv4();
    const element = {
      id: idElements,
      type: 'image',
      alt: imageAlt,
      src: selectedFile,
      top: '0',
      left: '0',
      height: `${sizeTextBoxHeight}%`,
      width: `${sizeTextBoxWidth}%`,
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setSelectedFile(null);
    setImageAlt(null);
    handleCloseImageHandler();
    setAnchorEl(null);
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseImageHandler}
      style={style}
    >
      <InputWithLabels
        value={imageAlt}
        setValue={setImageAlt}
        type="Alt Text"
        placeholder="Enter Alt Text"
        label="Image name"
      />

      <FormControl component="fieldset">
        <FormLabel style={{ marginTop: '100px' }} component="legend">
          Add Image
        </FormLabel>
        <RadioGroup
          row
          aria-label="imageInputType"
          name="imageInputType"
          value={imageInputType}
          onChange={(event) => setImageInputType(event.target.value)}
        >
          <FormControlLabel value="url" control={<Radio />} label="URL" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload" />
        </RadioGroup>
      </FormControl>
      <div>
        {imageInputType === 'url' ? (
          <div>
            <InputWithLabels
              value={selectedFile}
              setValue={setSelectedFile}
              type="Url"
              placeholder="Enter Url"
              label="Url"
            />
            {selectedFile && (
              <ImagePreview
                src={selectedFile}
                alt="Image Preview"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
          </div>
        ) : (
          <div>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {selectedFile && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="body1">
                  File: {selectedFile.name}
                </Typography>
                <img
                  src={selectedFile}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    marginTop: '10px',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
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
      <Tooltip
        title={
          selectedFile === null
            ? 'Give a valid url or image file, also give alt'
            : 'submit image'
        }
      >
        <div>
          <CustomPrimaryButton
            disabled={selectedFile === null || imageAlt === null}
            label="Create Now"
            additionalStyle={{ marginTop: '30px' }}
            onClick={handlePresentationTitleCreateImage}
          />
        </div>
      </Tooltip>
    </CustomModal>
  );
};
export default ImageModal;
