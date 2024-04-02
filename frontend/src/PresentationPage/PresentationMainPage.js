import React, { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import DeletePresentationModal from './DeletePresentationModal';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import EditPresentationTitleModal from './EditPresentationTitleModal';
import SlidesMain from './Slides/SlidesMain';

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginTop: '15px',
});

const StyledTypography = styled(Typography)`
  position: relative;
  font-size: 32px;
  text-align: center;

  &:hover::before {
    content: '';
    position: absolute;
    bottom: -5px; // Adjust this value as per your Typography line-height
    left: 0;
    width: 100%;
    height: 2px; // Line thickness
    background-color: black; // Line color
    animation: lineAnimation 0.5s forwards; // Animation time
  }

  @keyframes lineAnimation {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const PresentationDetail = () => {
  const { id } = useParams(); // Get the id from route parameters
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const { presentations, deleteOnePresentation, updatePresentationTitle } =
    usePresentationListStore();

  const presentation = presentations.find((p) => p.id === id);

  const [title, setTitle] = useState(`${presentation.name}`);

  const handlePresentationDelete = () => {
    console.log('delete');
    setOpen(false);
    deleteOnePresentation(id);
    nav('/dashboard');
  };

  const handleGoBack = () => {
    nav('/dashboard');
  };

  const handlePresentationTitleEdit = useCallback(() => {
    updatePresentationTitle(presentation.id, title);
    handleCloseEdit();
  }, [title]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledTypography
        sx={{
          fontSize: '32px',
          textAlign: 'center',
        }}
        onClick={handleOpenEdit}
      >
        {presentation.name}
      </StyledTypography>
      <Wrapper>
        <CustomPrimaryButton
          label="Delete"
          additionalStyle={{ width: '200px' }}
          onClick={handleOpen}
        />
        <CustomPrimaryButton
          label="Back"
          additionalStyle={{ width: '200px' }}
          onClick={handleGoBack}
        />
      </Wrapper>
      <SlidesMain slides={presentation.slides} />
      <DeletePresentationModal
        open={open}
        handleClose={handleClose}
        handlePresentationDelete={handlePresentationDelete}
      />
      <EditPresentationTitleModal
        open={openEdit}
        handleClose={handleCloseEdit}
        handlePresentationEdit={handlePresentationTitleEdit}
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
};

export default PresentationDetail;
