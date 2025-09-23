import { importMapsPlugin } from '@web/dev-server-import-maps';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
  nodeResolve: {
    exportConditions: ['production'],
  },
  files: ['target/**/*.test.js'],
  browsers: [
    puppeteerLauncher({
      args: ['--no-sandbox'],
    }),
  ],
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '@testing-library/dom': './testing-library/dom.js',
            '@testing-library/user-event': './testing-library/user-event.js',
          },
        },
      },
    }),
  ],
};
