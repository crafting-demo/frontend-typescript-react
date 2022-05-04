import { Message, ServiceType } from "common/types";

export const emptyMessage = (): Message => ({
  meta: {
    caller: ServiceType.React,
    callee: "",
  },
  actions: [],
});

export const uniqueKey = (): string => {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `${date}-${rand}`;
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
