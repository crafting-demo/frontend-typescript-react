import { logger } from "logger";

export class Producer {
  private producer?: WebSocket;

  private broker: string;

  private topic: string;

  constructor(topic: string, broker?: string) {
    this.topic = topic;

    const suffix = `${process.env.REACT_APP_DNS_SUFFIX}`;
    this.broker = broker || `wss://kafka${suffix}`;
  }

  public send(message: string) {
    this.producer = new WebSocket(`${this.broker}/producer/${this.topic}`);

    this.producer.onopen = () => {
      this.producer?.send(message);

      setTimeout(() => {
        this.shutdown();
      }, 3000);
    };

    this.producer.onerror = (event) => {
      logger.write("producer", "encountered socket error", event);
      this.producer?.close();
    };
  }

  public ready() {
    return this.producer && this.producer.readyState === this.producer.OPEN;
  }

  public shutdown() {
    if (!this.producer) {
      return;
    }
    this.producer.close();
  }
}
