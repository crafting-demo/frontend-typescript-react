import { Message, ServiceType } from "common/types";
import { logger } from "logger";

export class Client {
  private url: string;

  constructor(serviceType: string) {
    const suffix = `${process.env.REACT_APP_DNS_SUFFIX}/api`;
    switch (serviceType) {
      case ServiceType.Gin:
        this.url = `https://gin${suffix}`;
        break;
      case ServiceType.Express:
        this.url = `https://express${suffix}`;
        break;
      case ServiceType.Rails:
        this.url = `https://rails${suffix}`;
        break;
      case ServiceType.Spring:
        this.url = `https://spring${suffix}`;
        break;
      case ServiceType.Django:
        this.url = `https://django${suffix}`;
        break;
      default:
        this.url = "unknown";
    }
  }

  public async makeServiceCall(message: Message): Promise<Message | null> {
    const resp = await fetch(this.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (!resp.ok) {
      const err = await resp.json();
      logger.WriteError(
        "makeServiceCall",
        "failed to make service call",
        JSON.stringify(err)
      );
      return null;
    }
    return (await resp.json()) as Message | null;
  }
}
