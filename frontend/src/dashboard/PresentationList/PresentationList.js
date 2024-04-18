import React, { useState } from 'react';
import PresentationCard from './PresentationCard';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';

// Wrapper for presentation list that applies a flex layout.
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: center;
`;

// PresentationList component filters and displays a list of presentation cards.
const PresentationList = ({ presentations, searchInput }) => {
  // Filters presentations based on the search input.
  const filteredPresentations = presentations.filter((presentation) =>
    presentation.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleOpenConfirmDialog = () => setOpenConfirmDialog(true);
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const handleDeleteConfirm = () => {
    clearPresentations();
    handleCloseConfirmDialog();
  };

  const clearPresentations = usePresentationListStore(
    (state) => state.clearPresentations
  );
  return (
    <div
      style={{
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Tooltip
          title={presentations.length === 0 ? 'No presentation to delete' : ''}
        >
          <div>
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
        </Tooltip>
      </div>
      <Wrapper>
        {filteredPresentations.map((presentation) => (
          <PresentationCard key={presentation.id} presentation={presentation} />
        ))}
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
    </div>
  );
};

export default PresentationList;
