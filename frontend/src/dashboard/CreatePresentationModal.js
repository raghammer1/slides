import React, { useEffect, useState } from 'react';
import CustomModal from '../components/CustomModal';
import InputWithLabels from '../components/InputLabel';
import { Tooltip } from '@mui/material';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import { v4 as uuidv4 } from 'uuid';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import { useAlert } from '../components/AlertError';

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
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const { showAlert } = useAlert();
  const { addPresentation } = usePresentationListStore();

  useEffect(() => {
    setIsFormValid(name.length > 3);
  }, [name, setIsFormValid]);

  const getNotFormValid = () => {
    return 'Presentation name must be greater than 3 characters';
  };

  const getFormValid = () => {
    return 'Create New Presentation';
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleCreatePresentationFunction = () => {
    const presentationId = uuidv4();
    const randomIdSlides = uuidv4();
    const newPresentation = {
      id: presentationId,
      name,
      thumbnail,
      description,
      slides: [
        {
          elements: [],
          id: randomIdSlides,
        },
      ],
    };

    addPresentation(newPresentation);
    showAlert(`'${name}' Presentation Created`, 'green');
    handleClose();
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleClose}
      style={style}
    >
      <InputWithLabels
        value={name}
        setValue={setName}
        type="Presentation Name"
        placeholder="Enter Presentation Name"
        dataTestId={'create-presentation-name-test'}
        label="Presentation Name"
      />
      <InputWithLabels
        value={description}
        setValue={setDescription}
        label="Description"
        placeholder="Enter description"
        dataTestId={'create-presentation-description-input'}
      />
      <InputWithLabels
        value={thumbnail}
        setValue={setThumbnail}
        label="thumbnail"
        placeholder="Enter thumbnail"
        dataTestId={'create-presentation-thumbnail-input'}
      />
      <>
        <Tooltip title={!isFormValid ? getNotFormValid() : getFormValid()}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <CustomPrimaryButton
              label="Create"
              additionalStyle={{ marginTop: '20px' }}
              disabled={!isFormValid}
              onClick={handleCreatePresentationFunction}
              dataTestid={'create-presentation-name-test-button'}
            />
            <CustomPrimaryButton
              label="Cancel"
              additionalStyle={{
                marginTop: '20px',
                backgroundColor: '#8B0000',
              }}
              onClick={handleCancel}
              dataTestid={'cancel-presentation-button'}
            />
          </div>
        </Tooltip>
      </>
    </CustomModal>
  );
};
export default CreatePresentationModal;
