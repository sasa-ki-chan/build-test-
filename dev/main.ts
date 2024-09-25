//node_modules
import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import browserSync from 'browser-sync';

//user_modules
import devConfig from '../dev.config.ts';
import { parseConfig } from 'omochi-dev/lib/parseConfig.ts';
import Logger from './cli/logger.ts';
import { buildHtml } from 'omochi-dev/lib/buildHtml.ts';
import { buildJs } from 'omochi-dev/lib/buildJs.ts';
import { buildSass } from 'omochi-dev/lib/buildSass.ts';
import { copyImg } from 'omochi-dev/lib/copyImg.ts';
import * as utils  from 'omochi-dev/lib/utils.ts';


//user_types
import type Configuration from 'omochi-dev/types/config.d.ts';
import type buildOptions from 'omochi-dev/types/args.d.ts';

let isDebounced = false;

program
  .option('-p, --production', '本番環境用にビルドします', false)
  .option('-w, --watch', 'ソースディレクトリの変更を監視します', false)
  .option('-l, --log <log>', 'ログの深さを指定します')
  .option('-i, --index <index>', 'サーバーのインデックスファイルを指定します', 'index.html')
  .parse(process.argv);

const options: buildOptions = program.opts();

export const config = parseConfig(devConfig);
export const log = options.log ? new Logger(options.log) : new Logger(config.logDepth as Configuration['logDepth']);


options.watch || config.watch ? config.watch = true : config.watch = false;
options.log ? config.logDepth = options.log : config.logDepth = config.logDepth;
options.production ? config.mode = 'production' : config.mode = 'development';


const main = async (config: Required<Configuration>) => {
  utils.rmDir(config.dist);
  utils.mkDir(config.dist, config.src, config.excludePrefix);
  try {
    await Promise.all([buildHtml(config), buildJs(config), buildSass(config), copyImg(config)])
    if(config.watch) {
      browserSync.init({
        server: {
          baseDir: config.dist,
          index: options.index
        }
      });
    }
    else {
      return;
    }
  }
  catch(err) {
    if(err instanceof Error) {
      log.error('Error initializing build');
      log.errorMsg(err.message);
    }
  }
  fs.watch(config.src, { recursive: true }, async(eventType, filename) => {
    try {
      if(eventType === 'change' && typeof filename === 'string' && !isDebounced) {
        if(filename != null) filename = filename.replace(/\\/g, '/'); 
        if(config.html.extensions.includes(path.extname(filename))) {
          buildHtml(config);
        }
        else if(config.css.extensions.includes(path.extname(filename))) {
          buildSass(config);
        }
        else if(config.js.extensions.includes(path.extname(filename))) {
          buildJs(config);
        }
        else if(config.img.extensions.includes(path.extname(filename))) {
          copyImg(config);
        }
        
        
        if(config.watchOptions.hot){ 
          browserSync.reload();
        };
      }
      isDebounced = true;
      setTimeout(() => {
        isDebounced = false;
      }, 100);
    }
    catch(err) {
      if(err instanceof Error) {
        log.error('Error processing file change');
        if(filename != null) log.errorMsg(`File: ${filename}`);
        log.errorMsg(err.message);
      } 
    };
  })
}

main(config);