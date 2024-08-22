//node_modules
import esbuild from 'esbuild';
import globule from 'globule';
import { setPatterns } from './utils.ts';

//user_modules
import { log } from '../main.ts';

//user_types
import type Configuration from '../types/config.d.ts';

const webTarget = ['chrome58', 'firefox57', 'safari11', 'edge16'];
const nodeTarget = [ 'node10.4' ];

export const buildJs = async (config: Required<Configuration>) => {
  const patterns = setPatterns(config.js.patterns, config.js.extensions);
  const entries = globule.find( patterns, { srcBase: config.src, prefixBase: true } )
  try {
    await esbuild.build({
      entryPoints: entries,
      entryNames: '[dir]/[name]',
      bundle: true,
      outdir: config.dist,
      outbase: config.src,
      minify: config.js.minify,
      metafile: true,
      sourcemap: config.js.sourcemap,
      target: config.js.web ? webTarget : nodeTarget,
      logLevel: 'warning'
    })
  }
  catch(err) {
    if(err instanceof Error) {
      log.error('Error processing js file: ' + entries);
      log.errorMsg(err.message);
      return;
    }
    else {
      console.log(err);
      return;
    }
  }
    for(let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      log.built(entry.replace(config.src, config.dist).replace(/\.ts|\.tsx|\.js/,'.js'), entry);
    }
    return;
}