import { Message, ServiceType } from "common/types";

export class Client {
  private url: string;

  constructor(serviceType: string) {
    switch (serviceType) {
      case ServiceType.Gin:
        this.url = `https://gin${process.env.REACT_APP_DNS_SUFFIX}`;
        break;
      case ServiceType.Express:
        this.url = `https://express${process.env.REACT_APP_DNS_SUFFIX}`;
        break;
      case ServiceType.Rails:
        this.url = `https://rails${process.env.REACT_APP_DNS_SUFFIX}`;
        break;
      case ServiceType.Spring:
        this.url = `https://spring${process.env.REACT_APP_DNS_SUFFIX}`;
        break;
      case ServiceType.Django:
        this.url = `https://django${process.env.REACT_APP_DNS_SUFFIX}`;
        break;
      default:
        this.url = "unknown";
        break;
    }
  }

  public async makeNestedCall(message: Message): Promise<Message | null> {
    const resp = await fetch(this.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (!resp.ok) {
      return null;
    }
    return (await resp.json()) as Message | null;
  }
}
