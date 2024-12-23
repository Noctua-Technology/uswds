import terser from "@rollup/plugin-terser";
import { minifyHTMLLiterals } from "minify-html-literals";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "target/lib/define.js",
  output: {
    file: "assets/uswds.min.js",
    format: "iife",
  },
  plugins: [
    nodeResolve(),
    {
      name: "minify-html-literals",
      transform: (code) => minifyHTMLLiterals(code)?.code,
    },
    terser(),
  ],
};
