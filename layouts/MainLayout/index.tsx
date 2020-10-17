import React, { Fragment } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from 'next/head';
import RegisterLogin from '../../components/LoginRegister';
import ScrolToTop from 'components/ScrollToTop';
import ChatBubble from 'components/ClientChatBubble';
import { connect } from 'react-redux';

function MainLayout({ children, title, contacts, user }: any) {
  return (
    <Fragment>
      <Head>
        <title key="title">{title}</title>
        <link rel="icon" href="/icons/logo.svg" />
        <meta name="description" key="description" content="Chuyên cung cấp các dịch vụ thi công sơn epoxy, sơn nền nhà xưởng, chống thấm chuyên nghiệp. Bán và phân phối các sản phẩm sơn epoxy Hàn quốc, Đài Loan... chính hãng giá rẻ ở Tp. Hồ Chí Minh."/>
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/yGP7IhH.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="son-phuong-nam" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      {children}
      <RegisterLogin />
      <ScrolToTop />

      {(!user || user.role == 0) && <ChatBubble />}
      <Footer contacts={contacts} />
    </Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.users.data,
});

export default connect(mapStateToProps)(MainLayout);
