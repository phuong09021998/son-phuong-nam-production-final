import React from 'react';
import styles from './SeeMore.module.scss';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

export default function SeeMore({ link }: any) {
  return (
    <Link href={link}>
      <div className={styles.seeMore}>
        <Button className={styles.button} style={{ backgroundColor: '#e91e63' }}>
          Xem thêm
        </Button>
      </div>
    </Link>
  );
}
