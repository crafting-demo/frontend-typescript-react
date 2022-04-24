import { CssBaseline, Grid, Typography } from "@mui/material";

import { Message } from "components/Message";
import { Response } from "components/Response";

export function App() {
  return (
    <>
      <CssBaseline />

      <Typography variant="h1" sx={{ fontSize: "30px", padding: "20px 10px" }}>
        Crafting Demo - Multi-lang Multi-service app.
      </Typography>

      <Grid container spacing={0}>
        <Grid item md={12} lg={6}>
          <Message />
        </Grid>

        <Grid item md={12} lg={6}>
          <Response />
        </Grid>
      </Grid>
    </>
  );
}
