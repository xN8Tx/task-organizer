import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs/promises';
import { constants } from 'fs';

class Logger {
  /*
    TODO: access logger
  */
  private readonly __filename = fileURLToPath(import.meta.url);
  private readonly __dirname = path.dirname(this.__filename);

  private readonly ROOT_DIR = path.resolve(this.__dirname, '../../../');
  private readonly LOGS_DIR = path.join(this.ROOT_DIR, 'logs');

  private readonly ERROR_PATH = path.join(this.LOGS_DIR, 'error.log');

  constructor() {
    fs.access(this.ERROR_PATH, constants.F_OK)
      .then(() => console.log('Logger file exist!'))
      .catch(() =>
        fs
          .open(this.ERROR_PATH, 'w')
          .then(() => console.log('Logger file create!'))
          .catch(() =>
            console.log(
              'Can not create logger file, please create logger file by hands!',
            ),
          ),
      );
  }

  async error(file: string, message: string) {
    try {
      const date = new Date().toLocaleTimeString();

      const error = `\n${JSON.stringify({
        date,
        file,
        message,
      })}`;

      await fs.appendFile(this.ERROR_PATH, error);
      console.log(`[${date}] Add new error to logger.`);
    } catch (error) {
      console.log('Error in Logger, Error:', error);
    }
  }
}

const logger = new Logger();

export default logger;
