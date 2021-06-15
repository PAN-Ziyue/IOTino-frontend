import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
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
    { path: '/', component: '../layouts/BlankLayout' },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { name: 'login', path: '/user/login', component: './User/login' },
        { name: 'register-result', icon: 'smile', path: '/user/register-result', component: './User/register-result' },
        { name: 'register', icon: 'smile', path: '/user/register', component: './User/register' },
        { component: '404' },
      ],
    },
    {
      path: '/manage',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          name: 'dashboard',
          path: '/manage/dashboard',
          icon: 'dashboard',
          component: './dashboard',
        },
        {
          name: 'table-list',
          path: '/manage/list',
          icon: 'smile',
          component: './table-list',
        },
        {
          path: '/profile',
          name: 'profile',
          icon: 'profile',
          routes: [
            {
              path: '/',
              redirect: '/profile/basic',
            },
            {
              name: 'basic',
              icon: 'smile',
              path: '/profile/basic',
              component: './profile/basic',
            },
            {
              name: 'advanced',
              icon: 'smile',
              path: '/profile/advanced',
              component: './profile/advanced',
            },
          ],
        },
        {
          name: 'result',
          icon: 'CheckCircleOutlined',
          path: '/result',
          routes: [
            {
              path: '/',
              redirect: '/result/success',
            },
            {
              name: 'success',
              icon: 'smile',
              path: '/result/success',
              component: './result/success',
            },
            {
              name: 'fail',
              icon: 'smile',
              path: '/result/fail',
              component: './result/fail',
            },
          ],
        },
        { name: 'account', icon: 'user', component: './account', path: '/manage/account' },
        {
          component: '404',
        },
      ],
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
