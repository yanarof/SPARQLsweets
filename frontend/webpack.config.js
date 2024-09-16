const { merge } = require('webpack-merge');
const common = require('./node_modules/react-scripts/config/webpack.config');

module.exports = (env) => {
  const baseConfig = common(env);

  const performanceConfig = {
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      maxAssetSize: 1000000, // 1 MiB
      maxEntrypointSize: 1000000, // 1 MiB
    },
  };

  // Adjust the chunk size warning limit
  const buildConfig = {
    ...baseConfig,
    ...performanceConfig,
    module: {
      ...baseConfig.module,
      rules: baseConfig.module.rules.map((rule) => {
        if (rule.oneOf) {
          return {
            ...rule,
            oneOf: rule.oneOf.map((oneOfRule) => {
              if (oneOfRule.loader && oneOfRule.loader.includes('babel-loader')) {
                return {
                  ...oneOfRule,
                  options: {
                    ...oneOfRule.options,
                    plugins: [
                      ...oneOfRule.options.plugins,
                      [
                        require.resolve('babel-plugin-transform-react-remove-prop-types'),
                        { removeImport: true },
                      ],
                    ],
                  },
                };
              }
              return oneOfRule;
            }),
          };
        }
        return rule;
      }),
    },
  };

  return buildConfig;
};

