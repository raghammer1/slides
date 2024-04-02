import React from 'react';
import CustomModal from '../components/CustomModal';
import InputWithLabels from '../components/InputLabel';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
// import CustomPrimaryButton from '../components/CustomePrimaryButton';

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

const EditPresentationTitleModal = ({
  open,
  handleClose,
  handlePresentationEdit,
  title,
  setTitle,
}) => {
  return (
    <CustomModal open={open} handleClose={handleClose} style={style}>
      <InputWithLabels
        value={title}
        setValue={setTitle}
        type="Title"
        placeholder="Enter Title"
        label="Title"
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
