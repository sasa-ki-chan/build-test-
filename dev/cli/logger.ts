import chalk from 'chalk';
import type Configuration from 'omochi-dev/types/config.d.ts';

class Logger {

  private logDepth: number;

  constructor(logDepth: Configuration['logDepth']) {
    if(logDepth === 'none') {
      this.logDepth = 0;
    }
    else if(logDepth === 'minimum') {
      this.logDepth = 1;
    }
    else if(logDepth === 'default') {
      this.logDepth = 2;
    }
    else if(logDepth === 'debug' || logDepth === 'detailed') {
      this.logDepth = 3;
    }
    else {
      this.logDepth = 2;
    }
  }
  
  public start(watch: boolean) {
    console.log(chalk.bold.green('***************'));
    console.log(chalk.bold.green('* Start Build *'));
    console.log(chalk.bold.green('***************'));
    watch ? console.log(chalk.bold.yellow('Watch mode')) : console.log(chalk.gray('Build mode'));
  }

  public info(message: string) {
    if (this.logDepth >= 1) {
      console.log(chalk.bold.blue('[info] ') + message);
    }
  }

  public built(filename: string, srcFilename?: string ) {
    const ext = filename.split('.').pop();
    const message = this.logDepth >= 3 ? chalk.bold.yellow(srcFilename) + ' -> ' + chalk.bold.green(filename) : chalk.bold.green(filename);
    if (this.logDepth >= 2) {
      console.log(chalk.bold.blue(`[${ext}] `) + message);
    }
  }

  public builtMap(filename: string, srcFilename?: string) {
    const message = this.logDepth >= 3 ? chalk.bold.yellow(srcFilename) + ' -> ' + chalk.bold.green(filename) : chalk.bold.green(filename);
    if (this.logDepth >= 3) {
      console.log(chalk.bold.blue('[map] ') + message);
    }
  }

  public event(event: string, filename: string) {
    if (this.logDepth >= 2) {
      console.log(chalk.bold.yellow(`[${event}] `) + chalk.bold.green(filename));
    }
  }

  public error(errMsg: string) {
    console.error(chalk.bold.red('[error] ') + errMsg);
  }

  public errorMsg(errMsg: string) {
    console.error(errMsg);
  }

  public str(message: string) {
    return chalk.hex('#CE9178')(message);
  }

  public yellow(message: string) {
    return chalk.yellow(message);
  }
}

export default Logger;