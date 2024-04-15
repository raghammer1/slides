import React, { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import DeletePresentationModal from './DeletePresentationModal';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import EditPresentationTitleModal from './EditPresentationTitleModal';
import SlidesMain from './Slides/SlidesMain';
import { useAlert } from '../components/AlertError';

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
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
    animation: lineAnimation 0.5s forwards;
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
  const { id } = useParams();
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { showAlert } = useAlert();

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
    showAlert('Presentation Successfully Deleted', 'tomato');
    nav('/dashboard');
  };

  const handleGoBack = () => {
    nav('/dashboard');
  };

  const handleReArrangeSlides = () => {
    nav(`/presentation/${presentation.id}/rearrange`);
  };

  const handlePresentationTitleEdit = useCallback(() => {
    updatePresentationTitle(presentation.id, title);
    handleCloseEdit();
  }, [title]);

  const handleOpenSlideshow = () => {
    // Construct the URL for the '/preview' route
    const previewUrl = `${window.location.origin}/preview/${id}`;
    // Open the new tab with the '/preview' route
    window.open(previewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <StyledTypography
          sx={{
            fontSize: '32px',
            textAlign: 'center',
          }}
          onClick={handleOpenEdit}
        >
          <b>Title -</b> {presentation.name}
        </StyledTypography>
        <Wrapper>
          <CustomPrimaryButton
            label="Delete"
            additionalStyle={{ width: '200px' }}
            onClick={handleOpen}
            dataTestid={`presentation-delete-${presentation.id}`}
          />
          <CustomPrimaryButton
            label="Back"
            additionalStyle={{ width: '200px' }}
            onClick={handleGoBack}
            dataTestid={`presentation-go-back-${presentation.id}`}
          />
          <CustomPrimaryButton
            label="Re Arrange Slides"
            additionalStyle={{ width: '200px' }}
            onClick={handleReArrangeSlides}
            dataTestid={`presentation-re-arrange-page-${presentation.id}`}
          />
          <CustomPrimaryButton
            label="Slideshow"
            additionalStyle={{ width: '200px' }}
            onClick={handleOpenSlideshow}
            dataTestid={`presentation-re-arrange-page-${presentation.id}`}
          />
        </Wrapper>
      </div>
      <div>
        <SlidesMain presentationId={presentation.id} />
      </div>
      <DeletePresentationModal
        open={open}
        handleClose={handleClose}
        handlePresentationDelete={handlePresentationDelete}
        dataTestid={`presentation-delete-modal-button-${presentation.id}`}
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
