import { Action, Message, Meta, Payload } from "common/types";

export function ValidateMessage(message: string): string[] {
  try {
    const msg = JSON.parse(message) as Message;
    const errors = [];

    if (Object.keys(msg).length === 0) {
      return ["missing 'meta' field", "missing 'actions' field"];
    }
    if (!Object.keys(msg).includes("meta") || !msg.meta) {
      errors.push("missing 'meta' field");
    }
    if (!Object.keys(msg).includes("actions") || !msg.actions) {
      errors.push("missing 'actions' field");
      return errors;
    }

    const invalidMeta = ValidateMeta(msg.meta);
    if (invalidMeta.length > 0) {
      errors.push(...invalidMeta);
    }
    const invalidActions = ValidateActions(msg.actions);
    if (invalidActions.length > 0) {
      errors.push(...invalidActions);
    }

    return errors;
  } catch (e) {
    return [`${e}`];
  }
}

export function ValidateMeta(meta: Meta): string[] {
  const errors: string[] = [];

  if (Object.keys(meta).length === 0) {
    return ["missing 'caller' field", "missing 'callee' field"];
  }

  if (!Object.keys(meta).includes("caller") || !meta.caller) {
    errors.push("missing 'caller' field");
  }
  if (!Object.keys(meta).includes("callee") || !meta.callee) {
    errors.push("missing 'callee' field");
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

  if (!Object.keys(action).includes("action") || !action.action) {
    errors.push("missing 'action' field in action");
  }
  if (!Object.keys(action).includes("payload") || !action.payload) {
    errors.push("missing 'payload' field in action");
  }

  const err = ValidatePayload(action.payload, action.action || "");
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
  if (!Object.keys(payload).includes("value") || !payload.value) {
    return ["missing 'value' field in Echo payload"];
  }

  return [];
}

export function ValidateReadPayload(payload: Payload): string[] {
  const errors: string[] = [];

  if (!Object.keys(payload).includes("serviceName") || !payload.serviceName) {
    errors.push("missing 'serviceName' field in Read payload");
  }
  if (!Object.keys(payload).includes("key") || !payload.key) {
    errors.push("missing 'key' field in Read payload");
  }

  return errors;
}

export function ValidateWritePayload(payload: Payload): string[] {
  const errors: string[] = [];

  if (!Object.keys(payload).includes("serviceName") || !payload.serviceName) {
    errors.push("missing 'serviceName' field in Write payload");
  }
  if (!Object.keys(payload).includes("key") || !payload.key) {
    errors.push("missing 'key' field in Write payload");
  }
  if (!Object.keys(payload).includes("value") || !payload.value) {
    errors.push("missing 'value' field in Write payload");
  }

  return errors;
}

export function ValidateCallPayload(payload: Payload): string[] {
  const errors: string[] = [];

  if (!Object.keys(payload).includes("serviceName") || !payload.serviceName) {
    errors.push("missing 'serviceName' field in Call payload");
  }
  if (!Object.keys(payload).includes("actions") || !payload.actions) {
    errors.push("missing 'actions' field in Call payload");
  }

  const err = ValidateActions(payload.actions || []);
  if (err.length > 0) {
    errors.push(...err);
  }

  return errors;
}
