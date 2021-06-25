import {LockOutlined, MailOutlined, UserOutlined,} from '@ant-design/icons';
import {Alert, Tabs, Divider} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';
import {useIntl, Link, connect, FormattedMessage} from 'umi';
import type {Dispatch} from 'umi';
import type {StateType} from '@/models/login';
import type {LoginParamsType} from '@/services/login';
import type {ConnectState} from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{marginBottom: 24}}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const {userLogin = {}, submitting} = props;
  const {status, type: loginType} = userLogin;
  const [type, setType] = useState<string>('email');
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values, type},
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="email"
            tab={intl.formatMessage({
              id: 'pages.login.emailLogin.tab',
              defaultMessage: '邮箱密码登录',
            })}
          />
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: '用户名密码登录',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'email' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.emailLogin.errorMessage',
              defaultMessage: '邮箱或密码错误',
            })}
          />
        )}
        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '用户名或密码错误',
            })}
          />
        )}
        {type === 'email' && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.email.placeholder',
                defaultMessage: '邮箱',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.email.required"
                      defaultMessage="请输入邮箱!"
                    />
                  ),
                },
                {
                  type: 'email',
                  message: (
                    <FormattedMessage
                      id="pages.email.wrong-format"
                      defaultMessage="邮箱地址格式错误！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {type === 'account' && (
          <>
            <ProFormText
              name="account"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={intl.formatMessage({id: 'pages.account.placeholder',})}
              rules={[
                {
                  required: true,
                  message: (<FormattedMessage id="pages.email.required"/>),
                },
                {
                  type: 'string',
                  message: (<FormattedMessage id="pages.email.wrong-format"/>),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        <div style={{marginBottom: 24}}>
          <Link className={styles.login} to="/user/register" style={{float: 'right'}}>
            <FormattedMessage id="pages.login.registerAccount"/>
          </Link>
        </div>
        <Divider/>
      </ProForm>
    </div>
  );
};

export default connect(({login, loading}: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
