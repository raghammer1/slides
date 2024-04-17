import React, { useState } from 'react';
import Fold from './Fold/Fold';
import MainDashboard from './MainDashboard';
import DashboardFooter from './DashboardFooter';
import { styled } from '@mui/system';

const Dashboard = () => {
  const Wrapper = styled('div')({
    margin: 0,
    padding: 0,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchInput, setSearchInput] = useState('');

  return (
    <Wrapper>
      <Fold
        handleOpen={handleOpen}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <MainDashboard
        handleClose={handleClose}
        open={open}
        searchInput={searchInput}
      />
      <DashboardFooter />
    </Wrapper>
  );
};
export default Dashboard;
