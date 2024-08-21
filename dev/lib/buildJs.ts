//node_modules
import esbuild from 'esbuild';
import globule from 'globule';
import { setPatterns } from './utils.ts';

//user_modules
import { log } from '../main.ts';

//user_types
import type Configuration from '../types/config.d.ts';

export const buildJs = async (config: Required<Configuration>) => {
  const patterns = setPatterns(config.js.patterns, config.js.extensions);
  const entries = globule.find( patterns, { srcBase: config.src, prefixBase: true } )
  try {
    const result = await esbuild.build({
            entryPoints: entries,
            entryNames: '[dir]/[name]',
            bundle: true,
            outdir: config.dist,
            outbase: config.src,
            minify: config.js.minify,
            metafile: true,
            sourcemap: config.js.sourcemap,
            target: 'es2015'
    })
    for(let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      log.built(entry.replace(config.src, config.dist).replace(/\.ts|\.tsx|\.js/,'.js'), entry);
    }
    return;
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
    // .then((result) => {
    //   log.info('- esbuild complete!', isLogged);
    //   if(result.metafile) {
    //     Object.keys(result.metafile.outputs).forEach((output) => {
          
    //       if(output.endsWith('.js')) {
    //         log.built(output, result.metafile.outputs[output].entryPoint, isLogged);
    //       }
    //       else if (output.endsWith('.map')) {
    //         log.builtMap(output, result.metafile.outputs[output.replace('.map', '')].entryPoint, isLogged);
    //       }
    //     });
    //   }
    // }).catch((err) => {  console.error(""); });
};