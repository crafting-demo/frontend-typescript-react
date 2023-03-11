import { RequestMessage, ResponseMessage } from "common/types";
import { logger } from "logger";

export class Client {
  public async makeServiceCall(
    message: RequestMessage
  ): Promise<ResponseMessage | null> {
    const resp = await fetch(
      `https://api${process.env.REACT_APP_DNS_SUFFIX}/api`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );
    if (!resp.ok) {
      const err = await resp.json();
      logger.WriteError(
        "makeServiceCall",
        "failed to make service call",
        JSON.stringify(err)
      );
      return null;
    }
    return (await resp.json()) as ResponseMessage | null;
  }
}
