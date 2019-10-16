import React from 'react';
import { MenuItem } from 'rc-menu';


export default class MenuItem2 extends React.Component {
  static isMenuItem = 1;

  render() {
    const props = this.props;
    return <MenuItem {...props} />;
  }
}
