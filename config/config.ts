import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {path: '/', component: '../layouts/BlankLayout', redirect: '/user/login'},
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {name: 'login', path: '/user/login', component: './User/login'},
        {name: 'register-result', icon: 'smile', path: '/user/register-result', component: './User/register-result'},
        {name: 'register', icon: 'smile', path: '/user/register', component: './User/register'},
        {component: '404'},
      ],
    },
    {
      path: '/manage',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['user'],
          routes: [
            {
              name: 'dashboard',
              path: '/manage/dashboard',
              icon: 'dashboard',
              component: './dashboard',
            },
            {
              name: 'device',
              path: '/manage/devices',
              icon: 'smile',
              component: './device',
            },
            {
              name: 'settings',
              icon: 'setting',
              component: './settings',
              path: '/manage/settings'
            },
            {
              component: '404',
            },
          ],
        }
      ]
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
