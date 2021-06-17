import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';

import type { DashboardData } from '@/models/dashboard';

import BasicData from './components/BasicData';
import DataDetail from './components/DataDetail';
import Location from './components/Location';


interface AnalysisProps {
  dashboardData: DashboardData;
  dispatch: Dispatch;
  loading: boolean;
}

class Analysis extends Component<AnalysisProps> {
  reqRef: number = 0;
  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardData/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardData/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }


  render() {
    const { dashboardData, loading } = this.props;
    const {
      total,
      online,
      count,
      chartData,
      locationData,
    } = dashboardData;

    return (
      <GridContent>
        <React.Fragment>
          <BasicData
            loading={loading}
            total={total}
            online={online}
            count={count}/>
          <DataDetail
            chartData={chartData}
            loading={loading}
          />
          <Location
            loading={loading}
            locationData={locationData}
          />
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardData,
    loading,
  }: {
    dashboardData: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dashboardData,
    loading: loading.effects['dashboardData/fetch'],
  }),
)(Analysis);
