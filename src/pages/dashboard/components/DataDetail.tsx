import {Card, Col, Row} from 'antd';
import {FormattedMessage, formatMessage} from 'umi';
import type {RangePickerProps} from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import React from 'react';
import numeral from 'numeral';
import type {VisitDataType} from '../data.d';
import {Bar} from './Charts';
import styles from '../style.less';

const rankingListData: { name: string; count: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    name: formatMessage({id: 'dashboardandanalysis.analysis.test'}, {no: i}),
    count: 323234,
  });
}

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const DataDetail = ({salesData, loading}: {
  rangePickerValue: RangePickerValue;
  salesData: VisitDataType[];
  loading: boolean;
}) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{padding: 0}}
    title={
      <FormattedMessage id="dashboard.data-detail"/>
    }
  >
    <div className={styles.salesCard}>
      <Row>
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesBar}>
            <Bar
              height={292}
              title={<FormattedMessage id="dashboard.data-detail.count"/>}
              data={salesData}
            />
          </div>
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesRank}>
            <h4 className={styles.rankingTitle}>
              <FormattedMessage id="dashboard.data-detail.rank"/>
            </h4>
            <ul className={styles.rankingList}>
              {rankingListData.map((item, i) => (
                <li key={item.name}>
                  <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                    {i + 1}
                  </span>
                  <span className={styles.rankingItemTitle} title={item.name}>
                    {item.name}
                  </span>
                  <span>{numeral(item.count).format('0,0')}</span>
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
