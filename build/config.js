const path = require('path');
const buble = require('rollup-plugin-buble');
const version = process.env.VERSION || require('../package.json').version;

const banner = '/*! @lattebank/atree v' + version + ' (c) 2018 */';

const builds = {
  'ATree': {
    input: path.resolve(__dirname, '../src/ATree.jsx'),
    output: path.resolve(__dirname, '../dist/ATree.common.js'),
    external: [
      'react',
      'react-redux',
      'react-router-redux',
      'antd/lib/spin',
      'antd/lib/menu',
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
      buble(),
    ]
  };

  return config;
}

exports.getBuild = name => genConfig(builds[name]);
exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]));
