import React, { useState } from 'react';
import axios from 'config/axios';
import MainLayout from 'layouts/MainLayout';
import GreenBackground from 'components/GreenBackground';
import Modal from 'react-modal';
import styles from './ProductDetail.module.scss';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
// @ts-ignore
import currencyFormatter from 'currency-formatter'
import { toggleChatBubble } from 'redux/actions/ui';
import { connect } from 'react-redux'
import baseUrl from 'config/basedUrl'
import { useRouter } from 'next/router'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

function ShopItem({ productData, siteInfo, toggleChatBubble }: any) {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      maxWidth: '60rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alightItems: 'center',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '3em',
    },
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenChat = () => {
    toggleChatBubble(true)
  }
  // console.log(productData);
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

  return (
    <MainLayout title={productData.name} contacts={siteInfo}>
      <GreenBackground name="Cửa hàng" breadcrumb={`Trang chủ / Cửa hàng / ${productData.name}`} />
      <div className={styles.productWrapper}>
        <div className={styles.imgWrapper}>
          <div className={styles.tagWrapper}>
            {productData.salePrice && <div className={styles.saleTag}>Sale !</div>}
            {!productData.available && <div className={styles.soldOut}>Hết hàng !</div>}
          </div>

          <div className={styles.zoom} onClick={handleOpenModal}>
            <img src="/icons/search.svg" alt="zoom" />
          </div>
          <div className={styles.img}>
            <img src={`${baseUrl}/api/product/image/${productData.urlTitle}`} alt={productData.urlTitle} />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{productData.name}</div>
          <div className={styles.priceWrapper}>
            <div className={styles.title}> Giá:</div>
            <div className={styles.price}>
              {productData.salePrice && <span>{currencyFormatter.format(productData.price, { code: 'VND' })}</span>}{' '}
              {productData.salePrice ? currencyFormatter.format(productData.salePrice, { code: 'VND' }) : currencyFormatter.format(productData.price, { code: 'VND' })}
            </div>
          </div>
          {/* <div className={styles.quantity}>
            <div className={styles.title}>Số lượng:</div>
            <div className={styles.quantityInputWrapper}>
              <div className={styles.left}>-</div>
              <div className={styles.quantityInput}>
                <input type="number" />
              </div>
              <div className={styles.right}>+</div>
            </div>
          </div> */}
          <div className={styles.addToCartButton}>
            <Button
              style={{
                backgroundColor: `${productData.available ? '#e91e63' : 'gray'}`,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: 'white',
              }}
              disabled={productData.available ? false : true}
              className={styles.button}
              onClick={() => handleOpenChat()}
            >
              LIÊN HỆ
                <div className={styles.icon}>
                <img src="/icons/live-chat.svg" alt="chat" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.backToShopButton}>
        <Link href="/cua-hang">
          <Button
            style={{ backgroundColor: ' #e91e63', textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}
          >
            Quay lại cửa hàng
          </Button>
        </Link>
      </div>

      <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <img src={`${baseUrl}/api/product/image/${productData.urlTitle}`} alt={productData.urlTitle} />
        <div className={styles.closeModal} onClick={closeModal}>
          <img src="/icons/close-2.svg" alt="close" />
        </div>
      </Modal>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const paths = await axios.get('/producturls');
  // console.log(paths.data.paths);
  return {
    paths: paths.data.paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const productData = await axios.get(`/product/${params.id}`);
  const siteInfo = await axios.get('/site/info');

  return {
    props: {
      productData: productData.data.product,
      siteInfo: siteInfo.data.site.siteInfo,
    },
    revalidate: 1,
  };
}

export default connect(null, { toggleChatBubble })(ShopItem)