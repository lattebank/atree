import React, { Component } from 'react';
import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import ATree from '../../../src/ATree.jsx';


const store = {
  subscribe() {},
  dispatch() {},
  getState() {},
};


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

  render() {
    const { menus, loading } = this.state;

    return <ATree store={store} dataSource={menus} loading={loading} keyPath={[]} />;
  }
}
