import React from 'react';
import styles from './Services.module.scss';
import WaveLayout from 'layouts/WaveBackgroundLayout';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import baseUrl from 'config/basedUrl'

export default function Services({ services, disableTitle, disableBackground }: any) {
  const router = useRouter();
  const handleClick = (urlTitle: string) => {
    router.push(`/dich-vu/${urlTitle}`);
  };
  return (
    <React.Fragment>
      {disableBackground ? (
        <>
          {!disableTitle && <div className={styles.title}>DỊCH VỤ</div>}

          <div className={styles.servicesWrapper}>
            {services.map((item: any, i: number) => (
              // <Fade left={i % 2 ? false : true} right={i % 2 ? true : false} key={i}>
                <div className={styles.item} onClick={() => handleClick(item.urlTitle)} key={i}>
                  <div className={styles.name}>{item.title}</div>
                  <div className={styles.icon}>
                    <img src={`${baseUrl}/api/post/image/${item.urlTitle}`} alt="icon" />
                  </div>
                </div>
              // </Fade>
            ))}
          </div>
        </>
      ) : (
        <WaveLayout>
          {!disableTitle && <div className={styles.title}>DỊCH VỤ</div>}

          <div className={styles.servicesWrapper}>
            {services.map((item: any, i: number) => (
              // <Fade left={i % 2 ? false : true} right={i % 2 ? true : false} key={i}>
                <div className={styles.item} onClick={() => handleClick(item.urlTitle)} key={i}>
                  <div className={styles.name}>{item.title}</div>
                  <div className={styles.icon}>
                    <img src={`${baseUrl}/api/post/image/${item.urlTitle}`} alt="icon" />
                  </div>
                </div>
              // </Fade>
            ))}
          </div>
        </WaveLayout>
      )}
    </React.Fragment>
  );
}
