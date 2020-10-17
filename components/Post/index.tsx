import React, { Fragment } from 'react';
import styles from './Post.module.scss';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

export default function Post({ postData }: any) {
  return (
    <Fragment>
      <div className={styles.topPost}>
        <div className={styles.dateTag}>
          <div className={styles.icon}>
            <img src="/icons/clock.svg" alt="clock" />
          </div>
          <div className={styles.date}>{moment(postData.createdAt).format('DD/MM/YYYY')}</div>
        </div>
        <div className={styles.postTitle}>{postData.title}</div>
      </div>
      <div className={styles.seperate}>
        <hr />
      </div>
      <div className={styles.content}>{ReactHtmlParser(postData.content)}</div>
      <div className={styles.seperate}>
        <hr />
      </div>
    </Fragment>
  );
}
