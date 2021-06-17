import type { Effect, Reducer } from 'umi';
import { dashboardData } from '@/services/dashboard';

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

export interface DashboardData {
  total: number,
  online: number,
  count: number,
  
  // visitData: VisitDataType[];
  // visitData2: VisitDataType[];
  // salesData: VisitDataType[];
  // searchData: SearchDataType[];
  // offlineData: OfflineDataType[];
  // offlineChartData: OfflineChartData[];
  // salesTypeData: VisitDataType[];
  // salesTypeDataOnline: VisitDataType[];
  // salesTypeDataOffline: VisitDataType[];
  // radarData: RadarData[];
}

const initState = {
  total: 0,
  online: 0,
  count: 0,
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
  namespace: 'dashboardAndanalysis',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(dashboardData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(dashboardData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
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
