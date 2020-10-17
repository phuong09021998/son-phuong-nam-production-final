import React from 'react';
import ProductCard from '../ProductCard';
import styles from './Products.module.scss';
import SeeMore from '../SeeMoreButton';

export default function Products({ products }: any) {
  // console.log(products);
  return (
    <div className={styles.productsWrapper}>
      <div className={styles.title}>SẢN PHẨM BÁN CHẠY</div>
      <div className={styles.products}>
        {products.map((item: any, i: number) => {
          if (item.publish) {
            return (
              <ProductCard
                key={i}
                name={item.name}
                price={item.price}
                salePrice={item.salePrice}
                available={item.available}
                urlTitle={item.urlTitle}
              />
            );
          }
        })}
      </div>
      <SeeMore link="/cua-hang" />
    </div>
  );
}
