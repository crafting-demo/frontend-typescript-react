export class Consumer {
  private consumer?: WebSocket;

  private broker: string;

  constructor(broker?: string) {
    const url =
      broker ||
      `${process.env.REACT_APP_BROKER_SERVICE_ADDR}`.replace(/^http/, "ws");
    this.broker = url;
  }

  public start(onMessageCallback: (message: string) => void) {
    this.consumer = new WebSocket(this.broker);

    this.consumer?.addEventListener("message", (event) => {
      onMessageCallback(JSON.stringify(event.data));
    });
  }

  public shutdown() {
    this.consumer?.close();
  }
}
