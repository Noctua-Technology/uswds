import fs from "node:fs/promises";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import CleanCSS from "clean-css";
import { minify } from "terser";

const isBuild = process.env.ELEVENTY_RUN_MODE === "build";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("website/assets/**/*");
  eleventyConfig.addPassthroughCopy("website/robots.txt");
  eleventyConfig.addPassthroughCopy("website/CNAME");
  eleventyConfig.addPassthroughCopy("./node_modules/@noctuatech/uswds/**/*");

  eleventyConfig.addFilter("cssmin", (code) => {
    if (!isBuild) {
      return code;
    }

    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("jsmin", async (code) => {
    if (!isBuild) {
      return code;
    }

    return minify(code)
      .then((res) => res.code)
      .catch((err) => {
        console.error("Terser error: ", err);

        return code;
      });
  });

  eleventyConfig.addGlobalData("jsFiles", async () => {
    const files = await fs.readdir("./website/_includes/js/target");

    return files
      .filter((file) => file.endsWith(".js"))
      .map((file) => `js/target/${file}`);
  });

  return {
    dir: {
      input: "website",
      includes: "_includes",
    },
  };
}
