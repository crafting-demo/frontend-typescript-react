export interface Message {
  meta: Meta;
  actions: Action[];
}

export interface Meta {
  caller: string;
  callee: string;
  callTime: string;
}

export interface Action {
  action: string;
  payload: Payload;
}

export interface Payload {
  serviceName?: string;
  actions?: Action[];
  key?: string;
  value?: string;
}
