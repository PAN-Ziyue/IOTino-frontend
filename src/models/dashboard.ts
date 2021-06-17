import type {Effect, Reducer} from 'umi';
import {getDashboardData} from '@/services/dashboard';

export interface ModelType {
  namespace: string;
  state: DashboardData;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<DashboardData>;
    clear: Reducer<DashboardData>;
  };
}

export interface DetailDataType {
  x: string;
  y: number;
}

export interface DashboardData {
  total: number,
  online: number,
  count: number,
  chartData: DetailDataType[],
}

const initState = {
  total: 0,
  online: 0,
  count: 0,
  chartData: []
  // visitData: [],
  // visitData2: [],
  // salesData: [],
  // searchData: [],
  // offlineData: [],
  // offlineChartData: [],
  // salesTypeData: [],
  // salesTypeDataOnline: [],
  // salesTypeDataOffline: [],
  // radarData: [],
};

const Model: ModelType = {
  namespace: 'dashboardData',

  state: initState,

  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(getDashboardData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchSalesData(_, {call, put}) {
      const response = yield call(getDashboardData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
