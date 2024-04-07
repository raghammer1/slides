import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';
import useCurrentUserStore from '../../zustandStore/useCurrentUserStore';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';

const Fold = () => {
  const NavWrapper = styled('div')({
    height: '40px',
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  });

  const { clearCurrentUser } = useCurrentUserStore();
  const { clearPresentations } = usePresentationListStore();

  const nav = useNavigate();

  //! CLEAR ANY AND ALL ZU-STAND STORE SLICES
  const LogoutUser = () => {
    localStorage.clear();
    clearCurrentUser();
    clearPresentations();
    nav('/login');
  };

  return (
    <NavWrapper>
      <CustomPrimaryButton
        label={'HI'}
        additionalStyle={{ width: '100px', height: '30px' }}
      />
      <CustomPrimaryButton
        label={'Logout'}
        additionalStyle={{ width: '100px', height: '30px' }}
        onClick={LogoutUser}
        dataTestid={'logout-btn'}
      />
    </NavWrapper>
  );
};
export default Fold;
