import { Message, ServiceType } from "common/types";

export const emptyMessage = (): Message => ({
  meta: {
    caller: ServiceType.React,
    callee: "",
  },
  actions: [],
});
