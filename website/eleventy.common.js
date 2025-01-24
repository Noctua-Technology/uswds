import fs from "node:fs";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/**/*");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("./node_modules/@noctuatech/uswds/**/*");

  // eleventyConfig.addGlobalData(
  //   "jsFiles",
  //   fs.readdirSync("./src/_includes/js/").map((file) => `js/${file}`),
  // );

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
}
