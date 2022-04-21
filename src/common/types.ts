export enum ActionType {
  Echo = "Echo",
  Read = "Read",
  Write = "Write",
  Call = "Call",
}

export enum Topic {
  TsReact = "frontend-typescript-react",
  GoGin = "backend-go-gin",
  TsExpress = "backend-typescript-express",
  RubyRails = "backend-ruby-rails",
  KotlinSpring = "backend-kotlin-spring",
  PyDjango = "backend-python-django",
}

export enum Dependency {
  MySQL = "mysql",
  Postgres = "postgres",
  MongoDB = "mongodb",
  DynamoDB = "dynamodb",
  Redis = "redis",
}

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
