import React from 'react';
import styles from './TopAdminTable.module.scss';
// import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  handleCreate(): void;
}

export default function TopAdminTable({ handleCreate }: Props) {
  return (
    <div className={styles.topTableWrapper}>
      <div className={styles.create} onClick={handleCreate}>
        <div className={styles.icon}>
          <AddIcon style={{ color: '#1890ff' }} />
        </div>
        <div className={styles.text}>Tạo mới</div>
      </div>
    </div>
  );
}
