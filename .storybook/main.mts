import type { StorybookConfig } from '@storybook/web-components-vite';
import babel from '@rolldown/plugin-babel';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['../assets'],
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/uswds/';
    }

    config.mode = 'production';

    // The official Vite 8 workaround for standard decorators
    config.plugins = config.plugins || [];
    config.plugins.push(
      babel({
        plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
      }),
    );

    return config;
  },
};

export default config;
