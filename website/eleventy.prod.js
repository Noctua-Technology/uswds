import CleanCSS from "clean-css";
import { minify } from "terser";

import common from "./eleventy.common.js";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", async (code) => {
    try {
      const minified = await minify(code);

      return minified.code;
    } catch (err) {
      console.error("Terser error: ", err);
      return code;
    }
  });

  return common(eleventyConfig);
}
