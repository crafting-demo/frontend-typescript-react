export class Producer {
  private producer: WebSocket;

  private broker: string;

  private topic: string;

  constructor(topic: string, broker?: string) {
    this.topic = topic;

    const suffix = `${process.env.REACT_APP_DNS_SUFFIX}`;
    this.broker = broker || `wss://kafka${suffix}`;

    this.producer = new WebSocket(`${this.broker}/producer/${this.topic}`);
  }

  public send(message: string) {
    this.producer.onopen = () => {
      this.producer.send(message);
    };
  }

  public shutdown() {
    this.producer.close();
  }
}
