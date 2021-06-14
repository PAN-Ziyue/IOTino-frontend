import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import type { VisitDataType } from '../data';
import Trend from './Trend';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: VisitDataType[] }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.total-devices"
            defaultMessage="Total Devices"
          />
        }
        loading={loading}
        total={() => 233}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
    
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.total-devices"
            defaultMessage="Total Devices"
          />
        }
        loading={loading}
        total={() => 233}
        contentHeight={46}
      >
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
