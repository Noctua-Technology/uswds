export default function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.addPassthroughCopy("target/**");
  eleventyConfig.addPassthroughCopy("src/**");
  eleventyConfig.addPassthroughCopy("assets/**");
  eleventyConfig.addPassthroughCopy("node_modules/@joist/**");
  eleventyConfig.addPassthroughCopy("node_modules/tslib/**");

  return {
    dir: {
      input: "website",
      includes: "_includes",
    },
  };
}
