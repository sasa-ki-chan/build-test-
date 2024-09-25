//node_modules
import fs from 'fs';
import globule from 'globule';

//user_modules
import { log } from '../main.ts';
import { setPatterns } from './utils.ts';

//user_types
import type Configuration from '../types/config.d.ts';

export const copyImg = async (config: Required<Configuration>) => {
  const patterns = setPatterns(config.img.patterns, config.img.extensions);
  const files = globule.find(patterns, { srcBase: config.src, prefixBase: true });
  for(let i = 0; i < files.length; i++) {
    const dist = files[i].replace(config.src, config.dist)
    fs.copyFileSync(files[i], dist);
    log.built(dist, files[i]);
  }
}