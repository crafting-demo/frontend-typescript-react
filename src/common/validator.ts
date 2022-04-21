import { Action, Message, Meta, Payload } from "./types";

export function ValidateMessage(message: string): string[] {
  let msg: Message;
  try {
    msg = JSON.parse(message);
  } catch (e) {
    return [`${e}`];
  }

  if (Object.keys(msg).length === 0) {
    return ["missing 'meta' field", "missing 'actions' field"];
  }

  const errors: string[] = [];

  if (!Object.keys(msg).includes("Meta")) {
    errors.push("missing 'meta' field");
  }
  if (!Object.keys(msg).includes("Actions")) {
    errors.push("missing 'actions' field");
  }

  const invalidMeta = ValidateMeta(msg.Meta);
  if (invalidMeta.length > 0) {
    errors.push(...invalidMeta);
  }
  const invalidActions = ValidateActions(msg.Actions);
  if (invalidActions.length > 0) {
    errors.push(...invalidActions);
  }

  return errors;
}

export function ValidateMeta(meta: Meta): string[] {
  const errors: string[] = [];

  if (Object.keys(meta).length === 0) {
    return [
      "missing 'caller' field",
      "missing 'callee' field",
      "missing 'callTime' field",
    ];
  }

  if (!Object.keys(meta).includes("Caller")) {
    errors.push("missing 'caller' field");
  }
  if (!Object.keys(meta).includes("Callee")) {
    errors.push("missing 'callee' field");
  }
  if (!Object.keys(meta).includes("CallTime")) {
    errors.push("missing 'callTime' field");
  }

  return errors;
}

export function ValidateActions(actions: Action[]): string[] {
  const errors: string[] = [];

  actions.forEach((action) => {
    const err = ValidateAction(action);
    if (err.length > 0) {
      errors.push(...err);
    }
  });

  return errors;
}

export function ValidateAction(action: Action): string[] {
  const errors: string[] = [];

  if (Object.keys(action).length === 0) {
    return ["missing 'action' field", "missing 'payload' field"];
  }

  if (!Object.keys(action).includes("Action")) {
    errors.push("missing 'action' field in action");
  }
  if (!Object.keys(action).includes("Payload")) {
    errors.push("missing 'payload' field in action");
  }

  const err = ValidatePayload(action.Payload, action.Action || "");
  if (err.length > 0) {
    errors.push(...err);
  }

  return errors;
}

export function ValidatePayload(payload: Payload, action: string): string[] {
  if (Object.keys(payload).length === 0) {
    return [`missing payload fields in action ${action}`];
  }

  if (action === "Echo") {
    return ValidateEchoPayload(payload);
  }
  if (action === "Read") {
    return ValidateReadPayload(payload);
  }
  if (action === "Write") {
    return ValidateWritePayload(payload);
  }
  if (action === "Call") {
    return ValidateCallPayload(payload);
  }

  return [];
}

export function ValidateEchoPayload(payload: Payload): string[] {
  if (!Object.keys(payload).includes("Value")) {
    return ["missing 'value' field in Echo payload"];
  }

  return [];
}

export function ValidateReadPayload(payload: Payload): string[] {
  const errors: string[] = [];

  if (!Object.keys(payload).includes("ServiceName")) {
    errors.push("missing 'serviceName' field in Read payload");
  }
  if (!Object.keys(payload).includes("Key")) {
    errors.push("missing 'key' field in Read payload");
  }

  return errors;
}

export function ValidateWritePayload(payload: Payload): string[] {
  const errors: string[] = [];

  if (!Object.keys(payload).includes("ServiceName")) {
    errors.push("missing 'serviceName' field in Write payload");
  }
  if (!Object.keys(payload).includes("Key")) {
    errors.push("missing 'key' field in Write payload");
  }
  if (!Object.keys(payload).includes("Value")) {
    errors.push("missing 'value' field in Write payload");
  }

  return errors;
}

export function ValidateCallPayload(payload: Payload): string[] {
  const errors: string[] = [];

  if (!Object.keys(payload).includes("ServiceName")) {
    errors.push("missing 'serviceName' field in Call payload");
  }
  if (!Object.keys(payload).includes("Actions")) {
    errors.push("missing 'actions' field in Call payload");
  }

  const err = ValidateActions(payload.Actions || []);
  if (err.length > 0) {
    errors.push(...err);
  }

  return errors;
}
