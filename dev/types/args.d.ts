import type Configuration from './config.d.ts'

type buildOptions = {
  production: boolean;
  watch: boolean;
  log: Configuration['logDepth'];
  index: string;
};

export default buildOptions;