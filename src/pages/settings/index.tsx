import {GridContent} from '@ant-design/pro-layout';
import React, {Component} from 'react';
import {Input, Form, Button, message} from 'antd';

import type {Dispatch} from 'umi';
import {FormattedMessage} from 'umi';
import {connect} from 'umi';
import type {CurrentUser} from '@/models/user';
import {updateUser} from '@/services/user';


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
    return true;
  } catch (error) {
    message.error('error')
    return false;
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
    const {dispatch} = this.props;
    dispatch({
      type: 'settings/fetchCurrent',
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
      const {offsetWidth} = this.main;
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
            tooltip={<FormattedMessage id="settings.email.tip"/>}
            label={<FormattedMessage id="settings.email"/>}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="settings.email.required"/>,
              },
            ]}
          >
            <Input readOnly/>
          </Form.Item>
          <Form.Item
            name="account"
            label={<FormattedMessage id="settings.name"/>}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="settings.name.required"/>,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              <FormattedMessage id="settings.update"/>
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
  ({settings}: { settings: { currentUser: CurrentUser } }) => ({
    currentUser: settings.currentUser,
  }),
)(Settings);
