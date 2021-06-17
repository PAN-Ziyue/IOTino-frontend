import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import type { Dispatch } from 'umi';
import { connect } from 'umi';

import { getTimeDistance } from './utils/utils';
import type { DashboardData } from '@/models/dashboard';

import BasicData from './components/BasicData';
import DataDetail from './components/DataDetail';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

interface AnalysisProps {
  dashboardData: DashboardData;
  dispatch: Dispatch;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

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

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    });
  };


  render() {
    const { dashboardData, loading } = this.props;
    const {
      total,
      online,
      count,
      chartData,
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
