import { CssBaseline } from "@mui/material";

import { Container, Message, Response, Title } from "components";

export function App() {
  return (
    <>
      <CssBaseline />

      <Container>
        <Title variant="h1">
          Crafting Demo - Multi-lang Multi-service app.
        </Title>

        <Message />
      </Container>

      <Response />
    </>
  );
}
