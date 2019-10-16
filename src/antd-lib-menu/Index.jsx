import React from 'react';
import RcMenu, { SubMenu } from 'rc-menu';
import Item from './MenuItem.jsx';


export default class Menu extends React.Component {
  static Item = Item;

  static SubMenu = SubMenu;

  static defaultProps = {
    prefixCls: 'ant-menu',
    className: '',
    theme: 'light',  // or dark
  };

  inlineOpenKeys = []; // eslint-disable-line react/sort-comp

  constructor(props) {
    super(props);

    let openKeys;
    if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      openKeys = props.openKeys;
    }

    this.state = {
      openKeys: openKeys || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('openKeys' in nextProps) {
      this.setState({ openKeys: nextProps.openKeys });
      // return;
    }
  }

  handleClick = (e) => {
    this.handleOpenChange([]);

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }

  handleOpenChange = (openKeys) => {
    this.setOpenKeys(openKeys);

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  }

  setOpenKeys(openKeys) {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  }

  render() {
    const { prefixCls, className, theme } = this.props;
    const menuMode = 'vertical';
    const menuOpenAnimation = '';

    const menuClassName = `${prefixCls}-${theme} ${className}`;

    const menuProps = {
      openKeys: this.state.openKeys,
      onOpenChange: this.handleOpenChange,
      className: menuClassName,
      mode: menuMode,
    };

    // closing vertical popup submenu after click it
    menuProps.onClick = this.handleClick;
    menuProps.openTransitionName = menuOpenAnimation;

    return <RcMenu {...this.props} {...menuProps} />;
  }
}
