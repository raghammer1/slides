/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import InputWithLabels from '../../../../components/InputLabel';
import CustomPrimaryButton from '../../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';
import { imageEncoder } from '../../../../shared/base64Image';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

// Custom styling for this element.
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
const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  marginTop: '20px',
  borderRadius: '5px',
});

// Modal component for editing an existing image element.
const ImageBoxDoubleClick = ({
  open,
  handleCloseEditTextBox,
  presentationId,
  selectedSlideId,
  element,
}) => {
  const [imageAlt, setImageAlt] = useState(element.alt); // Initial alt text of the image.
  const updateElementInSlide = usePresentationListStore(
    (state) => state.updateElementInSlide
  );
  const [imageInputType, setImageInputType] = useState('url'); // Default input type for image source.
  const [selectedFile, setSelectedFile] = useState(element.src); // Initial source of the image (URL or file).

  // Function to handle file selection and encoding to base64 format.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      imageEncoder(file, (base64String) => {
        setSelectedFile(base64String);
      });
    } else {
      setSelectedFile(null);
      alert('Please select an image file.');
    }
  };

  // Function to save the edited image element.
  const handleEditTextBoxHere = () => {
    updateElementInSlide(presentationId, selectedSlideId, element.id, {
      alt: imageAlt,
      src: `${selectedFile}`,
    });
    handleCloseEditTextBox();
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseEditTextBox}
      style={style}
    >
      <Typography style={{ fontSize: '24px', color: '#fff' }}>
        Edit Image
      </Typography>
      <InputWithLabels
        dataTestId={'imageAlt-text-box-test'}
        value={imageAlt}
        setValue={setImageAlt}
        type="imageAlt"
        placeholder="Enter imageAlt"
        label="imageAlt"
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
              dataTestId={'image-box-url-test-edit'}
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
            <Button
              data-testid={'image-box-upload-test-btn'}
              variant="contained"
              component="label"
            >
              Upload File
              <input
                data-testid={'image-box-upload-test'}
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

      <CustomPrimaryButton
        label="Save"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleEditTextBoxHere}
        dataTestid={'edit-image-box-btn'}
      />
    </CustomModal>
  );
};
export default ImageBoxDoubleClick;
