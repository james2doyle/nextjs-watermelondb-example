const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  webpack(config) {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: 'worker-loader',
      options: {
        name: 'static/[hash].worker.js',
        publicPath: '/_next/',
      },
    });

    config.output.globalObject = 'this';

    // Further custom configuration here
    return config;
  }
});
