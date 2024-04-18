import React from 'react';
import CustomPrimaryButton from './CustomePrimaryButton';
import useCurrentUserStore from '../zustandStore/useCurrentUserStore';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import { useNavigate } from 'react-router-dom';

// AppFooter component providing a responsive footer with dynamic text sizing based on window width.
const AppFooter = () => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // const getFooterStyle = () => ({
  //   backgroundColor: '#f0f0f0',
  //   color: '#333',
  //   // position: 'fixed',
  //   left: '0',
  //   bottom: '0',
  //   width: '100%',
  //   borderTop: '1px solid #e7e7e7',
  //   fontSize: windowWidth > 1024 ? '14px' : windowWidth > 768 ? '12px' : '10px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // });

  const nav = useNavigate();
  const { clearCurrentUser } = useCurrentUserStore();
  const { clearPresentations } = usePresentationListStore();

  const LogoutUser = () => {
    localStorage.clear();
    clearCurrentUser();
    clearPresentations();
    nav('/login');
  };

  return (
    <CustomPrimaryButton
      label={'Logout'}
      additionalStyle={{ width: '170px', height: '30px' }}
      onClick={LogoutUser}
      dataTestid={'logout-btn'}
    />
  );
};

export default AppFooter;
