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
  Meta: Meta;
  Actions: Action[];
}

export interface Meta {
  Caller: string;
  Callee: string;
  CallTime: string;
}

export interface Action {
  Action: string;
  Payload: Payload;
}

export interface Payload {
  ServiceName?: string;
  Actions?: Action[];
  Key?: string;
  Value?: string;
}
