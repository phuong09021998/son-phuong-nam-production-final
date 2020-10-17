import React from 'react';
import styles from './ProductCard.module.scss';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
// @ts-ignore
import currencyFormatter from 'currency-formatter'
import { toggleChatBubble } from 'redux/actions/ui';
import { connect } from 'react-redux';
import baseUrl from 'config/basedUrl'

function ProductCard({ price, salePrice, name, urlTitle, available, toggleChatBubble }: any) {
  const router = useRouter();
  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    toggleChatBubble(true)
  };

  const handleClick = () => {
    router.push(`/cua-hang/${urlTitle}`);
  };

  return (
    <div className={styles.cardWrapper} onClick={handleClick}>
      <Fade bottom>
        <div className={styles.card}>
          {salePrice && <div className={styles.saleTag}>SALE!</div>}
          {!available && <div className={styles.outOfStock}>Hết hàng</div>}
          <div className={styles.img} style={{ background: `url('${baseUrl}/api/product/image/${urlTitle}` }}></div>
          <div className={styles.content}>
            <div className={styles.title}>{name}</div>
            {salePrice && <div className={styles.originalPrice}>{currencyFormatter.format(price, {code: 'VND'})}</div>}
            {salePrice ? (
              <div className={styles.price}>{currencyFormatter.format(salePrice, {code: 'VND'})}</div>
            ) : (
              <div className={styles.price}>{currencyFormatter.format(price, {code: 'VND'})}</div>
            )}
            <div className={styles.button}>
              <Button
                style={{
                  backgroundColor: `${available ? '#e91e63' : 'gray'}`,
                  color: 'white',
                  fontWeight: 'bold',
                  // marginBottom: '1em',
                }}
                // disabled={available ? false : true}  
                onClick={(e): any => handleAddToCart(e)}
                className={styles.buttonContent}
              >
                LIÊN HỆ
                <div className={styles.icon}>
                  <img src="/icons/live-chat.svg" alt="chat"/>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default connect(null, { toggleChatBubble })(ProductCard)