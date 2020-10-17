import React, { useState, useEffect, useRef } from 'react';
import MainLayout from 'layouts/MainLayout';
import GreenBackground from 'components/GreenBackground';
import styles from './Shop.module.scss';
import axios from 'config/axios';
import ProductCard from 'components/ProductCard';
import Pagination from '@material-ui/lab/Pagination';

export default function Shop({ products, siteInfo, range }: any) {
  const [items, setItems] = useState(products);
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPagination, setCurrentPagination] = useState(0);
  const isFirstRun = useRef(true);
  const count = Math.floor(range / 9 + 1);

  const handleSelectChange = (e: any) => {
    setSortBy(e.target.value);
  };

  // @ts-ignore
  const handlePagination = async (e: any, value: number) => {
    setCurrentPagination(value - 1);
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    axios
      .get(`/products?limit=9&sortBy=${sortBy}&order=desc&skip=${currentPagination * 9}`)
      .then((items) => setItems(items.data.products));
  }, [sortBy, currentPagination]);

  return (
    <MainLayout title="Cửa hàng | Sơn Phương Nam" contacts={siteInfo}>
      <GreenBackground name="Cửa hàng" breadcrumb="Trang chủ / Cửa hàng" />
      <div className={styles.selectWrapper}>
        <div className={styles.select}>
          <select name="sortBy" onChange={(e) => handleSelectChange(e)} defaultValue="name">
            <option value="name">Lọc theo tên</option>
            <option value="price">Lọc theo giá</option>
            <option value="sold">Bán chạy nhất</option>
          </select>
          <div className={styles.arrow}>
            <img src="/icons/up-and-down.svg" alt="up-and-down" />
          </div>
        </div>
      </div>
      <div className={styles.products}>
        {items.map((item: any, i: number) => {
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={count} color="secondary" onChange={handlePagination} />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const products = await axios.get('/products?limit=9&skip=0&sortBy=sold&order=desc');
  const siteInfo = await axios.get('/site/info');
  const range = await axios.get('/productrange');

  return {
    props: {
      products: products.data.products,
      siteInfo: siteInfo.data.site.siteInfo,
      range: range.data.range,
    },
    revalidate: 1,
  };
}
