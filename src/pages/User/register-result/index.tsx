import {Button, Result} from 'antd';
import type {IRouteProps} from 'umi';
import {FormattedMessage, Link} from 'umi';
import React from 'react';

import styles from './index.less';


const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        <FormattedMessage id="userandregister-result.register-result.back-home"/>
      </Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<IRouteProps> = ({location}) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="userandregister-result.register-result.msg"
          values={{email: (location?.state as any)?.account || 'AntDesign@example.com'}}
        />
      </div>
    }
    subTitle={<FormattedMessage id="userandregister-result.register-result.back-home"/>}
    extra={actions}
  />
);

export default RegisterResult;
