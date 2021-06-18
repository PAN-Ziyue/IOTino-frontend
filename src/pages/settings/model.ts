import type { Effect, Reducer } from 'umi';
import type { CurrentUser } from './data.d';
import { queryCurrent } from './service';

export interface ModalState {
  currentUser?: Partial<CurrentUser>;
  isLoading?: boolean;
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
    changeNotifyCount: Reducer<ModalState>;
    setProvince: Reducer<ModalState>;
    setCity: Reducer<ModalState>;
    changeLoading: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'settings',

  state: {
    currentUser: {},
    isLoading: false,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};

export default Model;
