/* eslint-disable no-console */

export class Logger {
  public static WriteError(source: string, desc: string, err: any) {
    console.error(
      `${new Date().toLocaleString()} ${source}: ${desc}${
        err ? `: ${err}` : ""
      }`
    );
  }

  public static Write(message: any) {
    console.error(`${message}`);
  }
}

export const logger = Logger;
