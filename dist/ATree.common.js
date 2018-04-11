/*! @lattebank/atree v0.0.2 (c) 2018 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var routerRedux = require('react-router-redux');
var Spin = _interopDefault(require('antd/lib/spin'));
var Menu = _interopDefault(require('antd/lib/menu'));

// import styles from './MenuTree.scss';


var SubMenu = Menu.SubMenu;
var MenuItem = Menu.Item;


function calMarginBottom(tree, selectedKeys) {
  var MENU_HEIGHT = 42;

  var INITIAL_MARGIN = tree.length;

  var offsets = 0;
  var heights = [];

  var children = tree.map(function (t) { return t; });
  var ids = selectedKeys.map(function (k) { return k; }).reverse();
  var id = ids.shift();

  while (id) {
    var idx = children.findIndex(function (c) { return c.id === id; }); // eslint-disable-line no-loop-func
    if (idx < 0) {
      break;
    }

    offsets += idx;

    children = children[idx].children.map(function (t) { return t; });
    heights.push(offsets + children.length);

    id = ids.shift();
  }

  var margin = Math.max.apply(null, heights) - INITIAL_MARGIN;
  margin = margin >= 0 ? margin : 0;
  // console.log(offsets, heights, margin);

  return margin * MENU_HEIGHT;
}


function recursive(node, parentKeyPath, onTitleClick) {
  if (node.children.length > 0) {
    var keyPath = [node.id].concat(parentKeyPath);
    // console.log(parentKeyPath, keyPath);
    return React__default.createElement( SubMenu, { key: node.id, title: node.label, onTitleClick: function () { return onTitleClick(keyPath); } }, node.children.map(function (c) { return recursive(c, keyPath, onTitleClick); }));
  } else {
    return React__default.createElement( MenuItem, { key: node.id, className: node.className }, node.label);
  }
}


var ATree = (function (Component$$1) {
  function ATree(props) {
    Component$$1.call(this, props);

    this.click = this.click.bind(this);
  }

  if ( Component$$1 ) ATree.__proto__ = Component$$1;
  ATree.prototype = Object.create( Component$$1 && Component$$1.prototype );
  ATree.prototype.constructor = ATree;

  ATree.prototype.click = function click (keyPath) {
    var ref = this.props;
    var prefix = ref.prefix;
    var postfix = ref.postfix; if ( postfix === void 0 ) postfix = '';
    var pathname = prefix + "/" + (keyPath.reverse()) + postfix;
    var location = { pathname: pathname };
    this.props.dispatch(routerRedux.push(location));
  };

  ATree.prototype.render = function render () {
    var this$1 = this;

    var ref = this.props;
    var dataSource = ref.dataSource;
    var loading = ref.loading;
    var width = ref.width;

    var selectedKeys = this.props.selectedKeys ? this.props.selectedKeys.split(',').reverse() : [];

    var marginBottom = calMarginBottom(dataSource, selectedKeys);

    var style = {
      width: width,
      marginBottom: marginBottom,
    };

    return (
      React__default.createElement( Spin, { spinning: loading },
        React__default.createElement( Menu, { mode: "vertical", selectedKeys: selectedKeys, openKeys: selectedKeys, onClick: function (ref) {
          var keyPath = ref.keyPath;

          return this$1.click(keyPath);
    }, className: "styles._", style: style },
          dataSource.map(function (node) { return recursive(node, [], this$1.click); })
        )
      )
    );
  };

  return ATree;
}(React.Component));


ATree.defaultProps = {
  width: 160,
};


var ATree$1 = reactRedux.connect()(ATree);

module.exports = ATree$1;
