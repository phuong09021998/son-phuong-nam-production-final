import React, { useEffect, useState } from 'react';
import styles from './ScrollToTop.module.scss';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={show ? styles.scollTopWrapper : styles.scollTopWrapperHidden} onClick={handleClick}>
      <img src="/icons/upload.svg" alt="scroll-top" />
    </div>
  );
}
