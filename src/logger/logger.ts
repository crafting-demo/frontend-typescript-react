export class Logger {
  public static write(source: string, desc: string, err: any) {
    // eslint-disable-next-line no-console
    console.error(
      `${new Date().toLocaleString()} ${source}: ${desc}${
        err ? `: ${err}` : ""
      }`
    );
  }
}

export const logger = Logger;
