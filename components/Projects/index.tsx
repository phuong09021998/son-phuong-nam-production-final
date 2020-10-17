import React from 'react';
import styles from './Projects.module.scss';
import ProjectCard from 'components/ProjectCard';
import SeeMore from '../SeeMoreButton';

export default function Projects({ projects, disableTitle, disableLoadMore }: any) {
  return (
    <div className={styles.projects}>
      {!disableTitle && <div className={styles.title}>DỰ ÁN MỚI NHẤT</div>}
      <div className={styles.cardsWrapper}>
        {projects.map((item: any, i: number) => {
          if (item.publish) {
            return (
              <ProjectCard title={item.title} date={item.createdAt} urlTitle={item.urlTitle} key={i} type={item.type} />
            );
          }
        })}
      </div>
      {!disableLoadMore && <SeeMore link="/du-an" />}
    </div>
  );
}
