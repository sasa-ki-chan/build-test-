//node_modules
import fs from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import globule from 'globule';
import * as sass from 'sass';

//user_modules
import { log } from '../main.ts';
import { setPatterns } from './utils.ts';

//user_types
import type Configuration from '../types/config.d.ts';

export const buildSass = async (config: Required<Configuration>) => {
  try {

    const processCss = async (css: string, dist: string, srcFile: string, sourceMap?: boolean ) => {

      const result = await postcss([autoprefixer]).process(css, { from: dist, map: { inline: false } });

      fs.writeFile(path.join(process.cwd(), dist), result.css, (err) => {
        if(err) { log.error(err.message); return; }
      });

      if (result.map && sourceMap) {
        fs.writeFile(path.join(process.cwd(), dist + '.map'), result.map.toString(), (err) => {
        if(err) { log.error(err.message); return;}
        });
      }

    };

      const patterns = setPatterns(config.css.patterns, config.css.extensions);
      const files = globule.find(patterns, { srcBase: config.src, prefixBase: true })
      for(let i = 0; i < files.length; i++) {
        const ext = path.extname(files[i]);
        const cssResult = sass.compile(files[i], { sourceMap: config.css.sourcemap, quietDeps: true });
        const dist = files[i].replace(config.src, config.dist).replace(ext, '.css');
        await processCss(cssResult.css, dist, files[i], config.css.sourcemap);
        log.built(dist, files[i]);
      };
  } 
  catch (err) {
    if(err instanceof Error) {
      log.error('Error processing sass file: ');
      log.errorMsg(err.message);
      return;
    }
    else {
      console.log(err);
      return;
    }
  }
};