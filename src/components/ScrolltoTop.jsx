import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrolltoTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // optional: adds a smooth scroll effect
    });
  }, [pathname]);

  return null;
};

export default ScrolltoTop;
