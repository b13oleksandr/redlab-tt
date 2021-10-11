const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    // eslint-disable-next-line no-use-before-define
    types.forEach((type) => addStyleResource(config.module.rule('stylus').oneOf(type)));
  },
};

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/css/variables.styl'),
      ],
    });
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/redlab-tt/'
    : '/',
};
