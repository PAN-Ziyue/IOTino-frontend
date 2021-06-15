import { Card, Col, Row } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import React from 'react';
import numeral from 'numeral';
import type { VisitDataType } from '../data.d';
import { Bar } from './Charts';
import styles from '../style.less';

const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'dashboardandanalysis.analysis.test' }, { no: i }),
    total: 323234,
  });
}

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const SalesCard = ({
  salesData,
  loading,
}: {
  rangePickerValue: RangePickerValue;
  salesData: VisitDataType[];
  loading: boolean;
}) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{ padding: 0 }}
    title={
      <FormattedMessage
        id="dashboardandanalysis.analysis.online-top-search"
        defaultMessage="Online Top Search"
      />
    }
  >
    <div className={styles.salesCard}>
      <Row>
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesBar}>
            <Bar
              height={292}
              title={
                <FormattedMessage
                  id="dashboardandanalysis.analysis.visits-trend"
                  defaultMessage="Visits Trend"
                />
              }
              data={salesData}
            />
          </div>
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesRank}>
            <h4 className={styles.rankingTitle}>
              <FormattedMessage
                id="dashboardandanalysis.analysis.visits-ranking"
                defaultMessage="Visits Ranking"
              />
            </h4>
            <ul className={styles.rankingList}>
              {rankingListData.map((item, i) => (
                <li key={item.title}>
                  <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                    {i + 1}
                  </span>
                  <span className={styles.rankingItemTitle} title={item.title}>
                    {item.title}
                  </span>
                  <span>{numeral(item.total).format('0,0')}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  </Card>
);

export default SalesCard;
