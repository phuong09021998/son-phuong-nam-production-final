import React from 'react';
import styles from './Green.module.scss';

interface Props {
  name: string;
  breadcrumb: string;
}

export default function GreenBackGround({ name, breadcrumb }: Props) {
  return (
    <div className={styles.shopWrapper}>
      <div className={styles.blurBackgroundWrapper} style={{ background: `url('/images/paint-shop.jpg')` }}>
        <div className={styles.blurBackground} />
        <div className={styles.wave}>
          <img src="/images/wave-white.svg" alt="wave" />
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{name}</div>
          <div className={styles.breadcrumb}>{breadcrumb}</div>
        </div>
      </div>
    </div>
  );
}
