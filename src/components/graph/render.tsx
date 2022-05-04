import { Box } from "@mui/material";

import { Message } from "common/types";

interface RenderParams {
  message: Message;
}

export function Render(params: RenderParams) {
  const { message } = params;

  return (
    <Box>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </Box>
  );
}
