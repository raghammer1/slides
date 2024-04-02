import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import DeletePresentationModal from './DeletePresentationModal';

const PresentationDetail = () => {
  const { id } = useParams(); // Get the id from route parameters
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { presentations, deleteOnePresentation } = usePresentationListStore();

  const presentation = presentations.find((p) => p.id === id);

  const handlePresentationDelete = () => {
    console.log('delete');
    setOpen(false);
    deleteOnePresentation(id);
    nav('/dashboard');
  };

  const handleGoBack = () => {
    nav('/dashboard');
  };

  return (
    <div>
      <h2>Presentation Detail - ID: {presentation.id}</h2>
      <CustomPrimaryButton
        label="Delete"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleOpen}
      />
      <CustomPrimaryButton
        label="Back"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleGoBack}
      />
      <DeletePresentationModal
        open={open}
        handleClose={handleClose}
        handlePresentationDelete={handlePresentationDelete}
      />
    </div>
  );
};

export default PresentationDetail;
