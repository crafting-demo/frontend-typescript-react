export function ValidateMessage(message: string): string[] {
  try {
    const msg = JSON.parse(message);
    const errors = [];

    if (!Object.keys(msg).includes("meta")) {
      errors.push("missing 'meta' field");
    }
    if (!Object.keys(msg).includes("actions")) {
      errors.push("missing 'actions' field");
    }

    return errors;
  } catch (e) {
    return [`${e}`];
  }
}
