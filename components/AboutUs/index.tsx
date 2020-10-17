import React from 'react';
import styles from './AboutUs.module.scss';
import WaveLayout from 'layouts/WaveBackgroundLayout';
//@ts-ignore\
import Fade from 'react-reveal/Fade';

export default function AboutUs() {
  return (
    <WaveLayout>
      <div className={styles.aboutUsWrapper}>
        {/* <Fade left> */}
          <div className={styles.img}>
            <img src="/images/about-us-img.jpg" alt="About Us" />
          </div>
        {/* </Fade> */}
        {/* <Fade right> */}
          <div className={styles.aboutUsCard}>
            <div className={styles.title}>Về chúng tôi</div>
            <div className={styles.question}>Chúng tôi là ai?</div>
            <div className={styles.text}>
              Là doanh nghiệp dẫn đầu trong lĩnh vực thi công sơn epoxy, sơn nền nhà xưởng, chống thấm. Bán và phân phối các sản phẩm sơn epoxy Hàn quốc, Đài Loan. Chúng tôi luôn cam kết mang lại cho
              khách hàng sản phẩm sơn epoxy chất lượng tốt nhất với giá thành rẻ nhất giúp các doanh nghiệp công ty tiết
              kiệm triệt để chi phí đầu tư nhà xưởng ban đầu chính hãng giá rẻ ở Tp. Hồ Chí Minh...
            </div>
          </div>
        {/* </Fade> */}
      </div>
    </WaveLayout>
  );
}
