import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: [{ from: "../assets", to: "/assets" }],
  async viteFinal(config) {
    config.base = "/uswds/";
    config.mode = "production";
    config.esbuild = {
      target: "es2022",
    };

    return config;
  },
};

export default config;
