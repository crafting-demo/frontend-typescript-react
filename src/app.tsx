import { Box, CssBaseline } from "@mui/material";

import { MessageBuilder } from "components/Message";
import { ResponseRenderer } from "components/Response";

export function App() {
  return (
    <Box>
      <CssBaseline />
      <MessageBuilder />
      <ResponseRenderer />
    </Box>
  );
}
