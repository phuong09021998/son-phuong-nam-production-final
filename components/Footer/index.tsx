import React, { Fragment } from 'react';
import styles from './Footer.module.scss';
import { useMediaQuery } from 'react-responsive';

export default function Footer({ contacts }: any) {
  const isSmallDevice: boolean = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumLargeDevice: boolean = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const renderMediumLargeDeviceLayout = () => (
    <footer className={styles.footer} id="footer">
      <div className={styles.copyRight}>
        <div className={styles.icon}>
          <img src="/icons/logo.svg" alt="logo" />
        </div>
        <div className={styles.text}>2020 © Công Ty TNHH MTV Xây Dựng Sơn Phương Nam</div>
      </div>
      <div className={styles.contact}>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/telephone.svg" alt="phone" />
          </div>
          <div className={styles.text}>{contacts.phone}</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/zalo.svg" alt="zalo" />
          </div>
          <div className={styles.text}>{contacts.zalo}</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/mail.svg" alt="email" />
          </div>
          <div className={styles.text}>{contacts.gmail}</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/facebook-2.svg" alt="facebook" />
          </div>
          <div className={styles.text}>{contacts.facebook}</div>
        </div>
      </div>
    </footer>
  );

  const renderSmallDeviceLayout = () => (
    <footer className={styles.footer} id="footer">
      <div className={styles.logo}>
        <div className={styles.logoWrapper}>
          <img src="/icons/logo.svg" alt="logo" />
        </div>
        <div className={styles.text}>
          <div className={styles.name}>PHƯƠNG NAM</div>
          <div className={styles.slogan}>Thách Thức Thời Gian</div>
        </div>
      </div>
      <div className={styles.contact}>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/telephone.svg" alt="phone" />
          </div>
          <div className={styles.text}>0908 108 690</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/zalo.svg" alt="zalo" />
          </div>
          <div className={styles.text}>0908 108 690</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/mail.svg" alt="email" />
          </div>
          <div className={styles.text}>quanepoxy@gmail.com</div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.icon}>
            <img src="/icons/facebook-2.svg" alt="facebook" />
          </div>
          <div className={styles.text}>fb.com/epoxyphuongnam</div>
        </div>
      </div>
      <div className={styles.copyRight}>
        <div className={styles.icon}>
          <img src="/icons/logo.svg" alt="logo" />
        </div>
        <div className={styles.text}>2020 © Công Ty TNHH MTV Xây Dựng Sơn Phương Nam</div>
      </div>
    </footer>
  );

  return (
    <Fragment>
      {isSmallDevice && renderSmallDeviceLayout()}
      {isMediumLargeDevice && renderMediumLargeDeviceLayout()}
    </Fragment>
  );
}
