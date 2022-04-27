import { Topic } from "common/types";

export const PickColorByTopic = (topic: string) => {
  switch (topic) {
    case Topic.React:
      return "primary";
    case Topic.Go:
      return "info";
    case Topic.Express:
      return "warning";
    case Topic.Rails:
      return "error";
    case Topic.Kotlin:
      return "secondary";
    case Topic.Python:
      return "success";
    default:
      return "grey";
  }
};
