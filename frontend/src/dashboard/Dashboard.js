import React from 'react';
import Fold from './Fold/Fold';
import MainDashboard from './MainDashboard';
import DashboardFooter from './DashboardFooter';
import { styled } from '@mui/system';

const Dashboard = () => {
  const Wrapper = styled('div')({
    margin: 0,
    padding: 0,
  });

  return (
    <Wrapper>
      <Fold />
      <MainDashboard />
      <DashboardFooter />
    </Wrapper>
  );
};
export default Dashboard;
