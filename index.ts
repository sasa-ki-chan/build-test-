import pug from 'pug';
import * as sass from 'sass';
import fs from 'fs';
import path from 'path';
import globule from 'globule';
import { program } from 'commander';
import esbuild from 'esbuild';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';

import config from './config.json';
import externalData from 'data/default.ts'
import Logger from './dev/log.ts';
import type { Configuration } from './dev/types/config.d.ts';




program
  .option('-w, --watch', 'ソースディレクトリの変更を監視します', false)
  .option('-l, --log <log>', 'ログの深さを指定します')
  .option('-i, --index <index>', 'サーバーのインデックスファイルを指定します', 'index.html')
  .parse(process.argv);

type buildOptions = {
  watch: boolean;
  log: Configuration['logDepth'];
  index: string;
};

const options: buildOptions = program.opts();

const log = options.log ? new Logger(options.log) : new Logger(config.logDepth as Configuration['logDepth']);
let isLogged = false;

const rmDir = (dir: string) => {
  if(fs.existsSync(dir)) {
    log.info('delete: '+ log.str(`./dir`), isLogged);
    fs.rmSync(dir, { recursive: true });
  }
};

const init = async(dist: string, src: string, exclude: string[]) => {
  const patterns = ['**/'].concat(exclude.map((excludePrefix: string) => `!**/${excludePrefix}*/**`));
  const srcDir = globule.find(patterns, { srcBase: src, prefixBase: true }).map((dir) => dir.replace(src, ''));
  srcDir.forEach((dir) => {
    fs.mkdirSync(dist + '/' + dir, { recursive: true });
  });
};

const setPatterns = (patterns: string[], extensions: string[]) => 
  patterns.map((pattern: string) => {
  return extensions.map((ext: string) => {
    return pattern + ext;
  });
}).flat();

const buildHtml = async () => {
  const patterns = setPatterns(config.html.patterns, config.html.extensions);
  // const getExternalDataPath = (data: string) => {
  //   const dataPath = path.join(process.cwd(), config.src, data);
  //     if(data.endsWith('.json')) {
  //       return data;
  //     }
  //     else if(data.endsWith('.js') || data.endsWith('.ts')) {
  //       return `file:///${dataPath}`;
  //     }
  // };
      
    globule.find(patterns, { srcBase: config.src, prefixBase: true } ).forEach(async (file: string) => {
      let result = 'empty';
      // const externalDataPath = config.html.data ? getExternalDataPath(config.html.data): null;
      // const { default: externalData } = externalDataPath ? await import(externalDataPath) : null;
      try {
        if(file.endsWith('.pug')) {
          result = pug.renderFile(file, {
            pretty: true,
            ...externalData
          });
        }
        else if(file.endsWith('.html')) {
          result = fs.readFileSync(file, 'utf-8');
        }
        const dist = file.replace(config.src, config.dist).replace('.pug', '.html');

        fs.writeFile(dist, result, (err) => {
          if(err) log.error(err.message, isLogged) 
        });
        log.built(dist, file, isLogged);
      }
      catch(err: any) {
        if(err instanceof ReferenceError) {
          log.error('Error processing pug file: ' + file, isLogged);
          log.errorMsg(err.message, isLogged);
          return;
        }
        else {
          console.log(err);
          return;
        }
      }
  });
}

const buildSass = async (file?: string) => {

  try {
    const processCss = async (css: string, dist: string, srcFile: string, sourceMap?: boolean ) => {
      const result = await postcss([autoprefixer]).process(css, { from: srcFile, map: { inline: false } });
      fs.writeFile(path.join(process.cwd(), dist), result.css, (err) => {
        if(err) log.error(err.message, isLogged) 
      });
      if (result.map && sourceMap) {
        fs.writeFile(path.join(process.cwd(), dist + '.map'), result.map.toString(), (err) => {
        if(err) log.error(err.message, isLogged)
        });
      }
    };

    if (file === undefined) { // 全ファイルを処理
      const patterns = setPatterns(config.css.patterns, config.css.extensions);
      globule.find(patterns, { srcBase: config.src, prefixBase: true }).forEach(async (file: string) => {
        const ext = path.extname(file);
        //sassコンパイル時の警告をオフ
        const cssResult = await sass.compileAsync(file, { sourceMap: config.css.sourcemap, quietDeps: true });
        const dist = file.replace(config.src, config.dist).replace(ext, '.css');
        await processCss(cssResult.css, dist, file, config.css.sourcemap);
        log.built(dist, file, isLogged);
      });
    } else { // 単一ファイルを処理
        const cssResult = await sass.compileAsync(file, { sourceMap: config.css.sourcemap, quietDeps: true });
        const ext = path.extname(file);
        const dist = file.replace(config.src, config.dist).replace(ext, '.css');
        await processCss(cssResult.css, dist, file, config.css.sourcemap);
        log.built(dist, file, isLogged);
      } 
  } 
  catch (err) {
      log.error('Error processing scss file: ' + file, isLogged);
  }
};

const buildJs = async () => {
  const patterns = setPatterns(config.js.patterns, config.js.extensions);
  const entries = globule.find( patterns, { srcBase: config.src, prefixBase: true } )
  console.log(entries)
  await esbuild.build({
    entryPoints: entries,
    entryNames: '[dir]/[name]',
    bundle: true,
    outdir: config.dist,
    outbase: config.src,
    minify: config.js.minify,
    metafile: true,
    sourcemap: config.js.sourcemap,
    target: 'es2015'
  }).then((result) => {
    log.info('- esbuild complete!', isLogged);
    if(result.metafile) {
      Object.keys(result.metafile.outputs).forEach((output) => {
        
        if(output.endsWith('.js')) {
          log.built(output, result.metafile.outputs[output].entryPoint, isLogged);
        }
        else if (output.endsWith('.map')) {
          log.builtMap(output, result.metafile.outputs[output.replace('.map', '')].entryPoint, isLogged);
        }
      });
    }
  }).catch((err) => { err.message ? log.error(err.message, isLogged) : log.error('Error processing javascript file', isLogged) });
}



const copyImg = async(file?: string) => {
  if(file != undefined) {
    const dist = file.replace(config.src, config.dist);
    fs.copyFile(file, dist, (err) => {
      if(err) log.error(err.message, isLogged);
      else log.built(dist, file, isLogged);
    });
  }
  else {
    const patterns = setPatterns(config.img.patterns, config.img.extensions);
    globule.find( patterns, { srcBase: config.src, prefixBase: true } ).forEach((file: string) => {
      const dist = file.replace(config.src, config.dist);
      fs.copyFile(file, dist, (err) => { if(err){log.error(err.message, isLogged);} });
      log.built(dist, file, isLogged);
    });
  }
}



const main = async () => {

  log.start(options.watch);
  try {
    fs.existsSync(config.dist) ? rmDir(config.dist) : null;
    await init(config.dist, config.src, config.excludePrefix);
    await Promise.all([buildHtml(), buildSass(), buildJs(), copyImg()]).then(() => {
      if(options.watch) {
        browserSync.init({
          port: config.watchOptions.server.port,
          server: {
            baseDir: config.dist,
            index: config.watchOptions.server.index
          },
          open: config.watchOptions.open
        });
        fs.watch(config.src, { recursive: true }, (eventType, filename) => {

          try{
            if(filename != null) filename = filename.replace(/\\/g, '/'); 
            if(isLogged) {
              setTimeout(() => {
                isLogged = false;
              }, 100);
            }

            if(typeof filename === 'string') {
              if(!isLogged) log.event(eventType, filename);
              if(config.html.extensions.includes(path.extname(filename))) {
                buildHtml();
              }
              else if(config.css.extensions.includes(path.extname(filename))) {
                buildSass();
              }
              else if(config.js.extensions.includes(path.extname(filename))) {
                buildJs();
              }
              else if(config.img.extensions.includes(path.extname(filename))) {
                copyImg(path.join(config.src,filename));
              }
              isLogged = true;
              if(config.watchOptions.hot){ browserSync.reload() };
            }
          }
          catch(err) {
            log.error('Error processing file change', isLogged)
          }
        });
      }
    })
  }
  catch(err) {
    log.error('Error initializing build', isLogged);
    if(err instanceof Error) log.errorMsg(err.message, isLogged);
  }
};

main();