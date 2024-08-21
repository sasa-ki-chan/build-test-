import type Configuration from "omochi-dev/types/config.d.ts";

interface RequiredConfiguration extends Required<Configuration> {}

export const parseConfig = (config: Configuration) => {

  if(!config.html) {
    config.html = {
      patterns:["**/*", "!**/_*", "!**/html/**/*", "!**/data/**"],
      extensions:[".html", ".pug", ".jade"],
      compiledExtension: ".html",
    }
  }
  if(!config.js) {
    config.js = {
      patterns:["**/*", "!**/*.d", "!**/_*/**/*"],
      extensions:[".js", ".ts", ".tsx"],
      // sourcemap: true,
      // minify: true,
      compiledExtension: ".js"
    }
  }
  if(!config.css) {
    config.css = {
      patterns: ["**/*", "!**/_*", "!**/_*/*"],
      extensions: [".css", ".scss", ".sass"],
      compiledExtension: ".css",
      // sourcemap: true,
    }
  }
  if(!config.img) {
    config.img = {
      patterns: ["**/*", "!**/_*/*"],
      extensions: [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico"]
    }
  }
  if(!config.mode) {
    config.mode = "development";
  }
  else if(config.mode !== 'production' && config.mode !== 'development') {
    config.mode = "development";
  }
  config.src ? config.src: "src"; 
  config.dist ? config.dist : "dist"; 
  //watchとdebugはデフォルトでfalseなので省略
  if(config.mode === 'production') {
    //watchは非推奨だが可能
    config.debug = false; //提出用のため非表示
    if(config.js && config.css) {
      config.js.sourcemap = false; //提出用のためオミット
      config.js.minify = true; //提出用のため圧縮
      config.css.sourcemap = false; //提出用のためオミット
    }
  } 
  config.excludePrefix ? config.excludePrefix : ["_", "html", "data"];
  if(config.watchOptions) {
    config.watchOptions.open ? config.watchOptions.open : false;
    config.watchOptions.hot ? config.watchOptions.hot : false ;
    if(config.watchOptions.server) {
      config.watchOptions.server.port ? config.watchOptions.server.port : 3000;
      config.watchOptions.server.index ? config.watchOptions.server.index : "index.html";
    }
  }
  return config as RequiredConfiguration;
}