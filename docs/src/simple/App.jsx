import React, { Component } from 'react';
import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import ATree from '../../../src/ATree.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      menus: [],
      trigger: 0,
    };
  }

  componentDidMount() {
    axios.get('./api/menus.json').then(({ data: menus }) => this.setState({
      menus,
      loading: false,
    }));
  }

  store = {
    subscribe() { },
    dispatch: ({ type, payload }) => {
      if (type === '@@router/CALL_HISTORY_METHOD') {
        const { method, args } = payload;
        if (method === 'push') {
          const { router } = this.props;
          const { pathname } = args[0];
          router.setRoute(pathname);
          const trigger = this.state.trigger + 1;
          this.setState({ trigger });
        } else {
          console.log(method, args);
        }
      } else {
        console.log(type, payload);
      }
    },
    getState() { },
  }

  render() {
    const { menus, loading } = this.state;

    const menuIds = this.props.router.getRoute(1); // -> /resources/{menuIds}
    // const keyPath = menuIds ? menuIds.split(',') : [];

    return <ATree store={this.store} dataSource={menus} loading={loading} prefix="/resources" selectedKeys={menuIds} />;
  }
}
