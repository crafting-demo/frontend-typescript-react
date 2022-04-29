export class Consumer {
  private consumer: WebSocket;

  private broker: string;

  private topic: string;

  private offset: string;

  constructor(topic: string, broker?: string, offset?: string) {
    this.topic = topic;
    this.offset = offset || "oldest";

    const suffix = `${process.env.REACT_APP_DNS_SUFFIX}`;
    this.broker = broker || `wss://kafka${suffix}`;

    this.consumer = new WebSocket(
      `${this.broker}/consumer/${this.topic}/${this.offset}`
    );
  }

  public start(onCallback: (message: string) => void) {
    this.consumer.onmessage = (message) => {
      onCallback(message.data as string);
    };
  }

  public ready() {
    return this.consumer.readyState === this.consumer.OPEN;
  }

  public reconnect() {
    this.consumer = new WebSocket(
      `${this.broker}/consumer/${this.topic}/${this.offset}`
    );
  }

  public shutdown() {
    this.consumer.close();
  }
}
