import React, { useCallback, useEffect, useState } from 'react';
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

const Wrapper2 = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-around',
  '@media (max-width: 1430px)': {
    flexDirection: 'column',
  },
});
const StyledTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  fontSize: '32px',
  fontWeight: '600',
  background: 'linear-gradient(to right, #66D3B1, #3EB489)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  padding: '10px 0',
  margin: '20px 0',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',

  '&:hover': {
    transform: 'scale(1.05)',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '3px',
    bottom: '-3px',
    left: '0',
    background: 'linear-gradient(to right, #000, #9999)',
    transition: 'transform 0.3s ease-in-out',
    transformOrigin: 'left',
    transform: 'scaleX(0)',
  },

  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));

const PresentationDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    window.innerWidth < 1430
  );

  const [isScreenLessThan1000, setIsScreenLessThan1000] = useState(
    window.innerWidth < 1000
  );

  const [isScreenLessThan700, setIsScreenLessThan700] = useState(
    window.innerWidth < 700
  );
  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 1430);
      setIsScreenLessThan1000(window.innerWidth < 1000);
      setIsScreenLessThan700(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  const [thumbnail, setThumbnail] = useState(`${presentation.thumbnail}`);
  const [description, setDescription] = useState(`${presentation.description}`);

  const handlePresentationDelete = () => {
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
    updatePresentationTitle(presentation.id, {
      name: title,
      thumbnail,
      description,
    });
    handleCloseEdit();
  }, [title, thumbnail, description]);

  const handleOpenSlideshow = () => {
    const previewUrl = `${window.location.origin}/preview/${id}/0`;
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
      <Wrapper2>
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
            additionalStyle={{
              width: '170px',
              background: 'linear-gradient(45deg, #66bb6a 30%, #26a69a 90%)',
              boxShadow: '0 3px 5px 2px rgba(102, 187, 106, .3)',
              color: 'white',
            }}
            onClick={handleOpen}
            dataTestid={`presentation-delete-${presentation.id}`}
          />
          <CustomPrimaryButton
            label="Back"
            additionalStyle={{
              width: '170px',
              background: 'linear-gradient(45deg, #66bb6a 30%, #26a69a 90%)',
              boxShadow: '0 3px 5px 2px rgba(102, 187, 106, .3)',
              color: 'white',
            }}
            onClick={handleGoBack}
            dataTestid={`presentation-go-back-${presentation.id}`}
          />
          <CustomPrimaryButton
            label="Re Arrange Slides"
            additionalStyle={{
              width: '170px',
              background: 'linear-gradient(45deg, #66bb6a 30%, #26a69a 90%)',
              boxShadow: '0 3px 5px 2px rgba(102, 187, 106, .3)',
              color: 'white',
            }}
            onClick={handleReArrangeSlides}
            dataTestid={`presentation-re-arrange-page-${presentation.id}`}
          />
          <CustomPrimaryButton
            label="Slideshow"
            additionalStyle={{
              width: '170px',
              background: 'linear-gradient(45deg, #66bb6a 30%, #26a69a 90%)',
              boxShadow: '0 3px 5px 2px rgba(102, 187, 106, .3)',
              color: 'white',
            }}
            onClick={handleOpenSlideshow}
            dataTestid={`presentation-re-arrange-page-${presentation.id}`}
          />
        </Wrapper>
      </Wrapper2>
      <div>
        <SlidesMain
          isScreenLessThan1000={isScreenLessThan1000}
          isScreenLessThan700={isScreenLessThan700}
          isNarrowScreen={isNarrowScreen}
          presentationId={presentation.id}
        />
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
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        setDescription={setDescription}
        description={description}
      />
    </div>
  );
};

export default PresentationDetail;
