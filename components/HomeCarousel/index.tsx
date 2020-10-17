import React from 'react';
import { Carousel } from 'antd';
import styles from './HomeCarousel.module.scss';
import LazyLoad from 'react-lazyload';

interface Props {
  carousel: any;
}

function HomeCarousel({ carousel }: Props) {
  const Image1 = () => <img src={`data:${carousel[0].contentType};base64,${Buffer.from(carousel[0].data)}`} alt="Thi công sơn epoxy, sơn nền nhà xưởng hcm"/>;
  const Image2 = () => <img src={`data:${carousel[1].contentType};base64,${Buffer.from(carousel[1].data)}`} alt="Thi công sơn epoxy, sơn nền nhà xưởng hcm"/>;
  const Image3 = () => <img src={`data:${carousel[2].contentType};base64,${Buffer.from(carousel[2].data)}`} alt="Thi công sơn epoxy, sơn nền nhà xưởng hcm"/>;

  return (
    <div className={styles.carousel}>
      <Carousel autoplay>
        <div className={styles.item}>
          <LazyLoad>
            <Image1 />
          </LazyLoad>
        </div>
        <div className={styles.item}>
          <LazyLoad>
            <Image2 />
          </LazyLoad>
        </div>
        <div className={styles.item}>
          <LazyLoad>
            <Image3 />
          </LazyLoad>
        </div>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
