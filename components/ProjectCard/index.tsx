import React from 'react';
import styles from './Card.module.scss';
import moment from 'moment';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import baseUrl from 'config/basedUrl';

export default function Card({ title, urlTitle, date, type }: any) {
  const formatDate = moment(date).format('DD/MM/YYYY');
  const router = useRouter();
  const handleClick = () => {
    if (type === 'project') {
      router.push(`/du-an/${urlTitle}`);
    } else {
      router.push(`/kien-thuc/${urlTitle}`);
    }
  };
  return (
    <div className={styles.cardWrapper} onClick={handleClick}>
      <Fade bottom>
        <div className={styles.card} style={{ background: `url('${baseUrl}/api/post/image/${urlTitle}')` }}>
          <div className={styles.dateWrapper}>
            <div className={styles.dateIcon}>
              <img src="/icons/clock.svg" alt="clock" />
            </div>
            <div className={styles.date}>{formatDate}</div>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.wave}>
              <img src="/images/wave-white.svg" alt="wave" />
            </div>
            <div className={styles.title}>{title}</div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
