import { Box } from "@mui/material";

import { Action, Message } from "common/types";

export interface ActionsBuilderParams {
  message: Message;
  onCallback: (actions: Action[]) => void;
}

export function ActionsBuilder() {
  return <Box />;
}
