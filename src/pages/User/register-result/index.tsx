import { Button, Result } from 'antd';
import type { IRouteProps } from 'umi';
import { useIntl, FormattedMessage, Link } from 'umi';
import React from 'react';

import styles from './index.less';

const intl = useIntl();

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        <FormattedMessage id="userandregister-result.register-result.back-home"/>
      </Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<IRouteProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="userandregister-result.register-result.msg"
          values={{ email: (location?.state as any)?.account || 'AntDesign@example.com' }}
        />
      </div>
    }
    subTitle={intl.formatMessage({ id: 'userandregister-result.register-result.activation-email' })}
    extra={actions}
  />
);

export default RegisterResult;
