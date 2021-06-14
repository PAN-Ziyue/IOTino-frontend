import React, { Component } from 'react';

import type { Dispatch} from 'umi';
import { connect } from 'umi';
import BaseView from './components/base';
import type { CurrentUser } from './data.d';
import styles from './style.less';


interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

interface SettingsState {
  mode: 'inline' | 'horizontal';
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

  render() {
    const { currentUser } = this.props;
    if (!currentUser.account) {
      return '';
    }

    return (
      <div className={styles.main}>
        <BaseView />
      </div>
    );
  }
}

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(Settings);
