import { Box, CssBaseline, Typography } from "@mui/material";

import { MessageBuilder } from "components/Message";
import { ResponseRenderer } from "components/Response";

export function App() {
  return (
    <Box>
      <CssBaseline />
      <Typography
        variant="h1"
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px 10px",
          fontSize: "30px",
        }}
      >
        Crafting Demo - Multi-lang Multi-service app.
      </Typography>
      <MessageBuilder />
      <ResponseRenderer />
    </Box>
  );
}
