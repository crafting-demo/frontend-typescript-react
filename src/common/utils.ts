import { ServiceType } from "common/types";

// generateUniqueID returns a unique enough string
// to populate "key" prop for each child in a list.
export const generateUniqueID = (): string => {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);

  return `${date}-${rand}`;
};

// PickColorByTopic returns theme color name by service type.
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
