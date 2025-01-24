import common from "./eleventy.common.js";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", (code) => {
    return code;
  });

  eleventyConfig.addFilter("jsmin", async (code) => {
    return code;
  });

  return common(eleventyConfig);
}
