import type  Configuration  from "omochi-dev/types/config.d.ts";

const devConfig: Configuration = {
  // mode:"development",
  src: "src",
  dist: "dist",
  watch: false,
  logDepth: "default",
  debug: true,
  html: {
    patterns:["**/*", "!**/_*", "!**/html/**/*", "!**/data/**"],
    extensions:[".html", ".pug", ".jade"],
    compiledExtension: ".html",
  },
  js: {
    patterns:["**/*", "!**/*.d", "!**/_*/**/*"],
    extensions:[".js", ".ts", ".tsx"],
    sourcemap: true,
    minify: true,
    compiledExtension: ".js"
  },
  css: {
    patterns: ["**/*", "!**/_*", "!**/_*/*"],
    extensions: [".css", ".scss", ".sass"],
    compiledExtension: ".css",
    sourcemap: true,
  },
  img: {
    patterns: ["**/*", "!**/_*/*"],
    extensions: [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico"]
  },
  excludePrefix: ["_", "html", "data"],
  watchOptions: {
    open: true,
    hot: true,
    server: {
      port: 3000,
      index: "index.html"
    }
  }
}

export default devConfig;