import React, { useEffect, useState } from 'react';
import CustomModal from '../components/CustomModal';
import InputWithLabels from '../components/InputLabel';
import { Tooltip } from '@mui/material';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import { v4 as uuidv4 } from 'uuid';
import usePresentationListStore from '../zustandStore/usePresentationListStore';

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

const CreatePresentationModal = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { addPresentation } = usePresentationListStore();
  // const { addSlide } = usePresentationListStore();

  useEffect(() => {
    setIsFormValid(name.length > 3);
  }, [name, setIsFormValid]);

  const getNotFormValid = () => {
    return 'Presentation name must be greater than 3 characters';
  };

  const getFormValid = () => {
    return 'Create New Presentation';
  };

  const handleCreatePresentationFunction = () => {
    const presentationId = uuidv4();
    const randomIdSlides = uuidv4();
    const newPresentation = {
      id: presentationId,
      name,
      slides: [
        {
          id: randomIdSlides,
        },
      ],
    };

    addPresentation(newPresentation);
    // addSlide(presentationId, slide);
    handleClose();
  };

  return (
    <CustomModal open={open} handleClose={handleClose} style={style}>
      <InputWithLabels
        value={name}
        setValue={setName}
        type="Presentation Name"
        placeholder="Enter Presentation Name"
        label="Presentation Name"
      />
      <>
        <Tooltip title={!isFormValid ? getNotFormValid() : getFormValid()}>
          <div>
            <CustomPrimaryButton
              label="Create"
              additionalStyle={{ marginTop: '30px' }}
              disabled={!isFormValid}
              onClick={handleCreatePresentationFunction}
            />
          </div>
        </Tooltip>
      </>
    </CustomModal>
  );
};
export default CreatePresentationModal;
