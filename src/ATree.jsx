import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as routerRedux from 'react-router-redux';
import Spin from 'antd/lib/spin';
import Menu from 'antd/lib/menu';


const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


function calMarginBottom(tree, selectedKeys) {
  const MENU_HEIGHT = 42;

  const INITIAL_MARGIN = tree.length;

  let offsets = 0;
  const heights = [];

  let children = tree.map(t => t);
  let ids = selectedKeys.map(k => k).reverse();
  let id = ids.shift();

  while (id) {
    const idx = children.findIndex(c => c.id === id); // eslint-disable-line no-loop-func
    if (idx < 0) {
      break;
    }

    offsets += idx;

    children = children[idx].children.map(t => t);
    heights.push(offsets + children.length);

    id = ids.shift();
  }

  let margin = Math.max.apply(null, heights) - INITIAL_MARGIN;
  margin = margin >= 0 ? margin : 0;
  // console.log(offsets, heights, margin);

  return margin * MENU_HEIGHT;
}


function recursive(node, parentKeyPath, onTitleClick) {
  if (node.children.length > 0) {
    const keyPath = [node.id].concat(parentKeyPath);
    // console.log(parentKeyPath, keyPath);
    return <SubMenu key={node.id} title={node.label} onTitleClick={() => onTitleClick(keyPath)}>{node.children.map(c => recursive(c, keyPath, onTitleClick))}</SubMenu>;
  } else {
    return <MenuItem key={node.id} className={node.className}>{node.label}</MenuItem>;
  }
}


class ATree extends Component {
  // static propTypes = {
  //   tree: PropTypes.arrayOf(PropTypes.shape({})),
  //   loading: PropTypes.bool,
  //   prefix: PropTypes.string,
  //   keyPath: PropTypes.arrayOf(PropTypes.string),
  //   postfix: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click(keyPath) {
    const { prefix, postfix = '' } = this.props;
    const pathname = `${prefix}/${keyPath.reverse()}${postfix}`;
    const location = { pathname };
    this.props.dispatch(routerRedux.push(location));
  }

  render() {
    const { dataSource, loading, width, className } = this.props;

    const selectedKeys = this.props.selectedKeys ? this.props.selectedKeys.split(',').reverse() : [];

    const marginBottom = calMarginBottom(dataSource, selectedKeys);

    const style = {
      width,
      marginBottom,
    };

    return (
      <Spin spinning={loading}>
        <Menu mode="vertical" selectedKeys={selectedKeys} openKeys={selectedKeys} onClick={({ keyPath }) => this.click(keyPath)} className={className || 'another-tree'} style={style}>
          {dataSource.map(node => recursive(node, [], this.click))}
        </Menu>
      </Spin>
    );
  }
}


ATree.defaultProps = {
  width: 160,
};


export default connect()(ATree);
