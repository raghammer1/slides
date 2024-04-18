import React, { useState } from 'react';
import { styled } from '@mui/system';
import CreatePresentationModal from './CreatePresentationModal';
import PresentationList from './PresentationList/PresentationList';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// MainDashboard component that orchestrates the presentation of lists and modal forms within the dashboard.
const MainDashboard = ({ open, handleClose, searchInput }) => {
  const Wrapper = styled('div')({
    height: '89vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
  });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleOpenConfirmDialog = () => setOpenConfirmDialog(true);
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const clearPresentations = usePresentationListStore(
    (state) => state.clearPresentations
  );
  const { presentations } = usePresentationListStore((state) => ({
    presentations: state.presentations,
  }));

  const handleDeleteConfirm = () => {
    clearPresentations();
    handleCloseConfirmDialog();
  };

  return (
    <>
      <Wrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <CustomPrimaryButton
            label={'Delete All Presentations'}
            disabled={presentations.length === 0}
            additionalStyle={{
              width: '250px',
              height: '35px',
            }}
            onClick={handleOpenConfirmDialog}
          />
        </div>
        <PresentationList
          presentations={presentations}
          searchInput={searchInput}
        />
        <CreatePresentationModal open={open} handleClose={handleClose} />
      </Wrapper>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all presentations?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainDashboard;
