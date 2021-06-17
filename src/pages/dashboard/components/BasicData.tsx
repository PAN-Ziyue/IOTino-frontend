import { Col, Row } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
import { ChartCard } from './Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const BasicData = ({ loading, total, online, count }:
  { loading: boolean; total: number, online: number, count: number }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage id="dashboard.total-devices"/>
        }
        loading={loading}
        total={total}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage id="dashboard.total-online"/>
        }
        loading={loading}
        total={online}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage id="dashboard.total-data"/>
        }
        loading={loading}
        total={count}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
  </Row>
);

export default BasicData;
