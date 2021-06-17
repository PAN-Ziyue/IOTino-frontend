import { GridContent } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Input, Form, Button, message } from 'antd';

import type { Dispatch } from 'umi';
import { FormattedMessage, formatMessage } from 'umi';
import { connect } from 'umi';
import type { CurrentUser } from '@/models/user';
import { updateUser } from '@/services/user';


interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

interface SettingsState {
  mode: 'inline' | 'horizontal';
}


const handleUpdate = async (value: CurrentUser) => {
  try {
    await updateUser({
      account: value.account,
      email: value.email,
    })
    message.success('success')
  } catch (error) {
    message.error('error')
  }
}

class Settings extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);
    this.state = {
      mode: 'inline',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndsettings/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  handleFinish = () => {

    message.success(formatMessage({ id: 'accountandsettings.basic.update.success' }));
  };




  render() {
    const width = Math.min(window.innerWidth * 0.87, 360);
    const { currentUser } = this.props;
    if (!currentUser.account) {
      return '';
    }

    return (
      <GridContent
        style={{
          width: width,
          margin: 'auto',
        }}
      >
        <Form
          layout="vertical"
          onFinish={
            async (value) => {
              await handleUpdate(value);
            }
          }
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            name="email"
            tooltip="不可修改"
            label={formatMessage({ id: 'accountandsettings.basic.email' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.email-message' }),
              },
            ]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="account"
            label={formatMessage({ id: 'accountandsettings.basic.nickname' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'accountandsettings.basic.nickname-message' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              <FormattedMessage
                id="accountandsettings.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link">
              hello
            </Button>
          </Form.Item>
        </Form>
      </GridContent>
    );
  }
}

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(Settings);
