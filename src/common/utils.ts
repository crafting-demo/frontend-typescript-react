import { Message, ServiceType } from "common/types";

// generateUniqueID returns a unique enough string
// to populate "key" prop for each child in a list.
export const generateUniqueID = (): string => {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);

  return `${date}-${rand}`;
};

// pickColorByTopic returns theme color name by service type.
export const pickColorByTopic = (topic: string) => {
  switch (topic) {
    case ServiceType.React:
      return "error";
    case ServiceType.Gin:
      return "info";
    case ServiceType.Express:
      return "primary";
    case ServiceType.Rails:
      return "warning";
    case ServiceType.Spring:
      return "secondary";
    case ServiceType.Django:
      return "success";
    default:
      return "error";
  }
};

export const findFirstIndexOf = (value: Message, self: Message[]) => {
  for (let i = 0; i < self.length; i += 1) {
    if (
      self[i].meta.callee === value.meta.callee &&
      self[i].meta.callTime === value.meta.callTime
    ) {
      return i;
    }
  }
  return -1;
};

export const uniqueMessages = (
  value: Message,
  index: number,
  self: Message[]
) => findFirstIndexOf(value, self) === index;

export const sortMessages = (m1: Message, m2: Message) => {
  const d1 = Date.parse(m1.meta.callTime!);
  const d2 = Date.parse(m2.meta.callTime!);
  if (d1 > d2) {
    return -1;
  }
  if (d1 < d2) {
    return 1;
  }
  return 0;
};
