import { importMapsPlugin } from "@web/dev-server-import-maps";

export default {
  nodeResolve: {
    exportConditions: ["production"],
  },
  files: ["target/**/*.test.js"],
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            "@testing-library/dom": "./testing-library/dom.js",
            "@testing-library/user-event": "./testing-library/user-event.js",
          },
        },
      },
    }),
  ],
};
