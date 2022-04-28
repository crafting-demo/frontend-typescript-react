import { ServiceType } from "common/types";

export const PickColorByTopic = (topic: string) => {
  switch (topic) {
    case ServiceType.React:
      return "primary";
    case ServiceType.Gin:
      return "info";
    case ServiceType.Express:
      return "warning";
    case ServiceType.Rails:
      return "error";
    case ServiceType.Spring:
      return "secondary";
    case ServiceType.Django:
      return "success";
    default:
      return "grey";
  }
};
