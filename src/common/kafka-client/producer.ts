export class Producer {
  private producer?: WebSocket;

  private broker: string;

  constructor(broker?: string) {
    const url =
      broker ||
      `${process.env.REACT_APP_BROKER_SERVICE_ADDR}`.replace(/^http/, "ws");
    this.broker = url;
  }

  public async send(topic: string, message: string) {
    this.producer = new WebSocket(this.broker);

    this.producer.addEventListener("open", () => {
      this.producer?.send(
        JSON.stringify({
          records: [
            {
              topic,
              value: message,
            },
          ],
        })
      );
    });
  }

  public shutdown() {
    this.producer?.close();
  }
}
