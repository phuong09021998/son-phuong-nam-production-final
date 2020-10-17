import React from 'react';
import MainLayout from 'layouts/MainLayout';
import axios from 'config/axios';
import GreenBackground from 'components/GreenBackground';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import styles from './AboutUs.module.scss';
import Services from 'components/ServicesComponent';

export default function Service({ siteInfo, services }: any) {
  return (
    <MainLayout title="Giới Thiệu | Sơn Phương Nam" contacts={siteInfo}>
      <GreenBackground name="Giới Thiệu" breadcrumb="Trang chủ / Giới Thiệu" />
      <div className={styles.aboutUsWrapper}>
        <Fade left>
          <div className={styles.img}>
            <img src="/images/company.jpeg" alt="About Us" />
          </div>
        </Fade>
        <Fade right>
          <div className={styles.aboutUsCard}>
            <div className={styles.title}>Về chúng tôi</div>
            <div className={styles.question}>Chúng tôi là ai?</div>
            <div className={styles.text}>
              Chuyên bán và phân phối các sản phẩm sơn epoxy Hàn quốc, Đài Loan. Chúng tôi luôn cam kết mang lại cho
              khách hàng sản phẩm sơn epoxy chất lượng tốt nhất với giá thành rẻ nhất giúp các doanh nghiệp công ty tiết
              kiệm triệt để chi phí đầu tư nhà xưởng ban đầu chính hãng giá rẻ ở Tp. Hồ Chí Minh...
            </div>
          </div>
        </Fade>
      </div>
      <Services services={services} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const siteInfo = await axios.get('/site/info');
  const services = await axios.get('/posts?type=service');

  return {
    props: {
      siteInfo: siteInfo.data.site.siteInfo,
      services: services.data.posts,
    },
    revalidate: 1,
  };
}
