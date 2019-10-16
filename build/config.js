const path = require('path');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const version = process.env.VERSION || require('../package.json').version;

const banner = '/*! @lattebank/atree v' + version + ' (c) 2019 */';

const builds = {
  'ATree': {
    input: path.resolve(__dirname, '../src/ATree.jsx'),
    output: path.resolve(__dirname, '../dist/ATree.common.js'),
    external: [
      'react',
      'react-redux',
      'react-router-redux',
      'antd/lib/spin',
      // 'antd/lib/menu',
      'rc-menu',
    ],
    format: 'cjs',
    banner,
  },
};

function genConfig(opts) {
  const config = {
    input: opts.input,
    output: opts.output,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    name: 'ATree',
    plugins: [
      commonjs({ sourceMap: false}),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: ['es2015-rollup', 'stage-0', 'react'],
      }),
    ]
  };

  return config;
}

exports.getBuild = name => genConfig(builds[name]);
exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]));
