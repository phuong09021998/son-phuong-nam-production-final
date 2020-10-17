import React from 'react';
import MainLayout from 'layouts/MainLayout';
import axios from 'config/axios';
import styles from './AboutUs.module.scss';
import Button from '@material-ui/core/Button';
import { toggleChatBubble } from 'redux/actions/ui';
import { connect } from 'react-redux';

function ContactUs({ siteInfo, toggleChatBubble }: any) {
  return (
    <MainLayout title="Liên Hệ | Sơn Phương Nam" contacts={siteInfo}>
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15671.092646478764!2d106.89412763680284!3d10.904836525750774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dfa55b1ddffb%3A0x3b978e34103b4f14!2zQ3R5IFROSEggTVRWIFhEIFPGoW4gUGjGsMahbmcgTmFt!5e0!3m2!1svi!2s!4v1601951985583!5m2!1svi!2s"
          width="100%"
          // height="60vw"
          frameBorder="0"
          style={{ border: 0, height: ' 40vw' }}
          aria-hidden="false"
          // tabIndex="0"
        ></iframe>
      </div>
      <div className={styles.chatWrapper}>
        <div className={styles.icon}>
          <img src="/icons/chat.svg" alt="chat" />
        </div>
        <div className={styles.button}>
          <Button
            style={{ backgroundColor: '#318fb5', color: 'white' }}
            variant="contained"
            onClick={() => toggleChatBubble(true)}
          >
            Chat với chúng tôi ngay
          </Button>
        </div>
      </div>

      <div className={styles.cardWrapper}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/icons/location.svg" alt="location" />
          </div>
          <div className={styles.content}>{siteInfo.address}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/icons/phone.svg" alt="phone" />
          </div>
          <div className={styles.content}>{siteInfo.phone}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/icons/email.svg" alt="gmail" />
          </div>
          <div className={styles.content}>{siteInfo.gmail}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/icons/zalo.svg" alt="zalo" />
          </div>
          <div className={styles.content}>{siteInfo.zalo}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <img src="/icons/facebook.svg" alt="facebook" />
          </div>
          <div className={styles.content}>{siteInfo.facebook}</div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const siteInfo = await axios.get('/site/info');

  return {
    props: {
      siteInfo: siteInfo.data.site.siteInfo,
    },
    revalidate: 1,
  };
}

export default connect(null, { toggleChatBubble })(ContactUs);
