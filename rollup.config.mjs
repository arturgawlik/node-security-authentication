import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import { copy } from "@web/rollup-plugin-copy";
import { string } from "rollup-plugin-string";

export default {
  input: "src/server.ts",
  output: {
    sourcemap: true,
    dir: "dist",
    format: "es",
  },
  plugins: [
    typescript(),
    // nodeResolve(),
    // copy({ patterns: "**/*.{html}" }),
    // string({
    //   include: "**/*.pem",
    // }),
  ],
};
