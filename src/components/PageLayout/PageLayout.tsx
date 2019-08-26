import React, { Fragment } from 'react';

import styles from './PageLayout.module.scss';

const PageLayout = (props: any) => (
  <Fragment>
    <h1 className={styles['header']}>Quick Quote</h1>
    <div className={styles['page-layout-container']}>{props.children}</div>
  </Fragment>
);
export default PageLayout;
