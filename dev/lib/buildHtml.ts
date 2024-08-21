//node_modules
import globule from 'globule';
import pug from 'pug';
import fs from 'fs';

//user_modules
import externalData from 'data/default.ts'
import { setPatterns } from 'omochi-dev/lib/utils.ts';
import { log } from 'omochi-dev/main.ts';

//user_types
import type Configuration from 'omochi-dev/types/config.d.ts';



export const buildHtml = async (config: Required<Configuration>) => {
  const patterns = setPatterns(config.html.patterns, config.html.extensions);  
  const files = globule.find(patterns, { srcBase: config.src, prefixBase: true } );
  for(let i = 0; i < files.length; i++) {
    try {
      const file = files[i];
      if(file.endsWith('.pug' || '.jade')) {
        const dist = file.replace(config.src, config.dist).replace(/\.pug|\.jade/,'.html');
        const html = pug.renderFile(file, {...externalData, pretty: true});
        fs.writeFileSync(dist, html);
        log.built(dist, file);
      }
      else if(file.endsWith('.html')) {
        const dist = file.replace(config.src, config.dist);
        const html = fs.readFileSync(file, 'utf-8');
        fs.writeFileSync(dist, html);
        log.built(dist, file);
      }
    }
    catch(err) {
      if(err instanceof Error) {
        log.error('Error processing pug file: ' + files[i]);
        log.errorMsg(err.message);
        return;
      }
      else {
        console.log(err);
        return;
      }
    }
  }
};