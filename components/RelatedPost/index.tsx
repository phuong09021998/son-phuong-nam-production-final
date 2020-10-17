import React from 'react';
import styles from './RelatedPost.module.scss';
import Services from '../ServicesComponent';
import Projects from 'components/Projects';

export default function RelatedPost({ posts, title, type, disableBackground, disableTitle }: any) {
  return (
    <div className={styles.relatedPostWrapper}>
      <div className={styles.title}>{title}</div>
      {type === 'service' ? (
        <div className={styles.servicesWrapper}>
          <Services services={posts} disableBackground={disableBackground} disableTitle={disableTitle} />
        </div>
      ) : (
        <div className={styles.postsWrapper}>
          <Projects projects={posts} disableTitle={disableTitle} disableLoadMore={true} />
        </div>
      )}
    </div>
  );
}
