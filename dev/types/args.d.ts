type buildOptions = {
  production: boolean;
  watch: boolean;
  log: Configuration['logDepth'];
  index: string;
};

export default buildOptions;