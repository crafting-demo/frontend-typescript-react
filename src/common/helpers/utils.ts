import { Message, ServiceType } from "common/types";

export const emptyMessage = (): Message => ({
  meta: {
    caller: ServiceType.React,
    callee: ServiceType.Gin,
  },
  actions: [],
});

export const uniqueKey = (): string => {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `${date}-${rand}`;
};
