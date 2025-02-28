export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("target/**");
  eleventyConfig.addPassthroughCopy("assets/**");
  eleventyConfig.addPassthroughCopy("node_modules/**");
}
