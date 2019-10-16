atree
==

another tree

CHANGELOG
==

2019-10-17 v0.1.1
--

`ant-design@3` 升级后，在变更说明中提到[使用了 rc-trigger 重构了菜单以支持延迟加载和窗口边缘浮层自适应方向](https://ant.design/changelog-cn#%E6%96%B0%E5%A2%9E%E5%8A%9F%E8%83%BD%E5%8F%8A%E6%94%B9%E8%BF%9B)。这是一个严重的 BREAKING CHANGE。简单来说，从第二层菜单开始，子菜单会脱离它原本的逻辑位置而被渲染到全局 `body` 上，并使用一定的计算策略来保持对齐。该策略是智能的而不是自然的，因此在被用来展示树形结构时，反复跳动。当然它的本意是适配各种场景下的弹出二级菜单，也许一开始我们选择基于 `Menu` 来实现 `Tree` 就是一个失误。

临时的决定是锁死基于 `rc-menu@5.0.14` 开发。

[ant-design 相关讨论](https://github.com/ant-design/ant-design/pull/8150)，[2](https://github.com/ant-design/ant-design/pull/8058)，[3](https://github.com/ant-design/ant-design/issues/2837)，[4](https://github.com/ant-design/ant-design/issues/6589)

[rc-menu 相关讨论](https://github.com/react-component/menu/issues/19)
