import React from 'react';
import axios from 'config/axios';
import MainLayout from 'layouts/MainLayout';
import Post from 'components/Post';
import RelatedPost from 'components/RelatedPost';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

export default function ServiceDetail({ postData, siteInfo, projects }: any) {
  const router = useRouter()
  // console.log(postData);
  if (router.isFallback) {
    return <div
      style={{
        width: '100%',
        marginTop: '10em',
        textAlign: 'center',
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  }
  // console.log(postData);
  return (
    <MainLayout title={`${postData.title}`} contacts={siteInfo}>
      <Post postData={postData} />
      <RelatedPost
        title="Kiến thức liên quan"
        type="projects"
        posts={projects}
        disableBackground={true}
        disableTitle={true}
      />
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const paths = await axios.get('/posturls?type=info');
  // console.log(paths.data.paths);
  return {
    paths: paths.data.paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await axios.get(`/post/${params.id}`);
  const siteInfo = await axios.get('/site/info');
  const projects = await axios.get('/posts?type=info&limit=6');

  return {
    props: {
      postData: postData.data.post,
      siteInfo: siteInfo.data.site.siteInfo,
      projects: projects.data.posts,
    },
    revalidate: 1,
  };
}
