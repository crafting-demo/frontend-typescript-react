import { logger } from "logger";

export class Consumer {
  private consumer?: WebSocket;

  private broker: string;

  private topic: string;

  private offset: string;

  private onCallback: (message: string) => void;

  constructor(
    topic: string,
    onCallback: (message: string) => void,
    broker?: string,
    offset?: string
  ) {
    this.topic = topic;
    this.offset = offset || "oldest";
    this.onCallback = onCallback;

    const suffix = `${process.env.REACT_APP_DNS_SUFFIX}`;
    this.broker = broker || `wss://kafka${suffix}`;
  }

  public start() {
    this.consumer = new WebSocket(
      `${this.broker}/consumer/${this.topic}/${this.offset}`
    );

    this.consumer.onmessage = (event) => {
      this.onCallback(event.data as string);
    };

    this.consumer.onclose = (event) => {
      logger.write(
        "consumer",
        "closing socket, attempting reconnect in 250ms",
        event.reason
      );

      setTimeout(() => {
        this.reconnect();
      }, 250);
    };

    this.consumer.onerror = (event) => {
      logger.write("consumer", "encountered socket error", event);
      this.consumer?.close();
    };
  }

  public ready() {
    return this.consumer && this.consumer.readyState === this.consumer.OPEN;
  }

  public reconnect() {
    if (this.ready()) {
      return;
    }
    this.start();
  }

  public shutdown() {
    if (!this.consumer) {
      return;
    }
    this.consumer.close();
  }
}
