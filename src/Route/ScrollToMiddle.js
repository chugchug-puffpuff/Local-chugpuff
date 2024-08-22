import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToMiddle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 700);
  }, [pathname]);

  return null;
};

export default ScrollToMiddle;