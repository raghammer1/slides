import React from 'react';
import CustomModal from '../components/CustomModal';
import InputWithLabels from '../components/InputLabel';
import CustomPrimaryButton from '../components/CustomePrimaryButton';

// Similar style as the delete modal for consistency
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

// Component for editing presentation title and details
const EditPresentationTitleModal = ({
  open,
  handleClose,
  handlePresentationEdit,
  title,
  setTitle,
  thumbnail,
  setThumbnail,
  description,
  setDescription,
}) => {
  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleClose}
      style={style}
    >
      <InputWithLabels
        value={title}
        setValue={setTitle}
        type="Title"
        placeholder="Enter Title"
        label="Title"
      />
      <InputWithLabels
        value={thumbnail}
        setValue={setThumbnail}
        type="Thumbnail"
        placeholder="Enter Thumbnail"
        label="Thumbnail"
      />
      <InputWithLabels
        value={description}
        setValue={setDescription}
        type="Description"
        placeholder="Enter Description"
        label="Description"
      />
      <CustomPrimaryButton
        label="Edit Now"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handlePresentationEdit}
      />
    </CustomModal>
  );
};
export default EditPresentationTitleModal;
