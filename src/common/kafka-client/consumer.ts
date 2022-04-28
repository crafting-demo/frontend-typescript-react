export class Consumer {
  private consumer: WebSocket;

  private broker: string;

  private topic: string;

  constructor(topic: string, broker?: string) {
    this.topic = topic;

    const suffix = `${process.env.REACT_APP_DNS_SUFFIX}`;
    this.broker = broker || `wss://kafka${suffix}`;

    this.consumer = new WebSocket(
      `${this.broker}/consumer/${this.topic}/latest`
    );
  }

  public async start(updateMessagesCallback: (message: string) => void) {
    this.consumer.onmessage = (event) => {
      updateMessagesCallback(event.data as string);
    };
  }

  public ready() {
    return this.consumer.readyState === this.consumer.OPEN;
  }

  public reconnect() {
    this.consumer = new WebSocket(
      `${this.broker}/consumer/${this.topic}/latest`
    );
  }

  public shutdown() {
    this.consumer.close();
  }
}
