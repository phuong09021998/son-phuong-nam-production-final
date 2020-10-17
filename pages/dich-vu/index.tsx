import React from 'react';
import MainLayout from 'layouts/MainLayout';
import axios from 'config/axios';
import GreenBackground from 'components/GreenBackground';
import Services from 'components/ServicesComponent';

export default function Service({ siteInfo, services }: any) {
  return (
    <MainLayout title="Dịch vụ | Sơn Phương Nam" contacts={siteInfo}>
      <GreenBackground name="Dịch vụ" breadcrumb="Trang chủ / Dịch vụ" />
      <div style={{ height: '3rem' }} />
      <Services services={services} disableBackground={true} disableTitle={true} />
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
