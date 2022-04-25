export class Producer {
  private producer: WebSocket;

  private broker: string;

  private topic: string;

  constructor(topic: string, broker?: string) {
    this.topic = topic;

    const url =
      broker ||
      `${process.env.REACT_APP_BROKER_SERVICE_ADDR}`.replace(/^http/, "ws");
    this.broker = url;

    this.producer = new WebSocket(`${this.broker}/producer/${this.topic}`);
  }

  public async send(message: string) {
    this.producer.onopen = () => {
      this.producer.send(JSON.stringify(JSON.parse(message)));
    };
  }

  public shutdown() {
    this.producer.close();
  }
}
