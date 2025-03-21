import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ["../assets"],
  async viteFinal(config, { configType }) {
    if (configType === "PRODUCTION") {
      config.base = "/uswds/storybook/";
    }

    config.mode = "production";
    config.esbuild = {
      target: "es2022",
    };

    return config;
  },
};

export default config;
