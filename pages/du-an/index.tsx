import React, { useState } from 'react';
import MainLayout from 'layouts/MainLayout';
import axios from 'config/axios';
import GreenBackground from 'components/GreenBackground';
import Projects from 'components/Projects';
import Pagination from '@material-ui/lab/Pagination';

export default function Service({ siteInfo, projects, range }: any) {
  const [items, setItems] = useState(projects);
  const count = Math.floor(range / 9 + 1);

  // @ts-ignore
  const handlePagination = async (e: any, value: number) => {
    if (value > 1) {
      const newItems = await axios.get(
        `/posts?type=project&limit=9&sortBy=createdAt&order=desc&skip=${(value - 1) * 9}`,
      );
      setItems(newItems.data.posts);
    } else {
      setItems(projects);
    }
  };

  return (
    <MainLayout title="Dự án | Sơn Phương Nam" contacts={siteInfo}>
      <GreenBackground name="Dự án" breadcrumb="Trang chủ / Dự án" />
      <div style={{ height: '3rem' }} />
      <Projects projects={items} disableTitle={true} disableLoadMore={true} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={count} color="secondary" onChange={handlePagination} />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const siteInfo = await axios.get('/site/info');
  const projects = await axios.get('/posts?type=project&limit=9&sortBy=createdAt&order=desc');
  const range = await axios.get('/postrange?type=project');

  return {
    props: {
      siteInfo: siteInfo.data.site.siteInfo,
      projects: projects.data.posts,
      range: range.data.range,
    },
    revalidate: 1,
  };
}
