import {Card, Col, Row} from 'antd';
import {FormattedMessage} from 'umi';

import React from 'react';
import numeral from 'numeral';
import type {DetailDataType} from '@/models/dashboard';
import {Bar} from './Charts';
import styles from '../style.less';


const DataDetail = ({loading, chartData}: {
  loading: boolean;
  chartData: DetailDataType[];
}) => (
  <Card loading={loading} bordered={false}
        bodyStyle={{padding: 0}} title={<FormattedMessage id="dashboard.data-detail"/>}
  >
    <div className={styles.salesCard}>
      <Row>
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesBar}>
            <Bar
              height={292}
              title={<FormattedMessage id="dashboard.data-detail.count"/>}
              data={Object.assign([], chartData).sort(() => (Math.random() > .5) ? 1 : -1)}
            />
          </div>
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesRank}>
            <h4 className={styles.rankingTitle}>
              <FormattedMessage id="dashboard.data-detail.rank"/>
            </h4>
            <ul className={styles.rankingList}>
              {chartData.map((item, i) => (
                <li key={item.x}>
                  <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                    {i + 1}
                  </span>
                  <span className={styles.rankingItemTitle} title={item.x}>
                    {item.x}
                  </span>
                  <span>{numeral(item.y).format('0,0')}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  </Card>
);

export default DataDetail;
