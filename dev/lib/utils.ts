//node_modules
import fs from 'fs';
import globule from 'globule';

//user_modules
import { log } from '../main.ts';

export const setPatterns = (patterns: string[], extensions: string[]) => {
  return patterns.map((pattern: string) => {
    return extensions.map((ext: string) => {
      return pattern + ext;
  });
  }).flat()
}

export const rmDir = (dir: string) => {
  if(fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
    log.info('delete: '+ log.str(`./${dir}`));
  }
}

export const mkDir = async(dist: string, src: string, exclude: string[]) => {
  const patterns = ['**/'].concat(exclude.map((excludePrefix: string) => `!**/${excludePrefix}*/**`));
  const srcDir = globule.find(patterns, { srcBase: src, prefixBase: true }).map((dir) => dir.replace(src, ''));
  srcDir.forEach((dir) => {
    fs.mkdirSync(dist + '/' + dir, { recursive: true });
  });
}
