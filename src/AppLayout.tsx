import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from './layouts/Topbar/TopBar';
import { Footer } from './layouts/Footer/Footer';
import './styles/index.scss';
import { useEffect } from 'react';

const AppLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <TopBar size="normal" type="without-login" />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
