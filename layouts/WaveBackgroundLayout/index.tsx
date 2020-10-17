import React from 'react';
import styles from './WaveBackgroundLayout.module.scss';

export default function WaveBackGroundLayout({ children }: any) {
  return (
    <div className={styles.wave}>
      <img src="/images/wave.png" alt="wave" />
      <div className={styles.children}>{children}</div>
    </div>
  );
}
