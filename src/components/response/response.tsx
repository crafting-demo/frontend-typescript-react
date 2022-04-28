import { Box } from "@mui/material";
import { Message } from "common/types";

interface ResponseBuilderParams {
  response?: Message;
}

export function ResponseBuilder(params: ResponseBuilderParams) {
  const { response } = params;

  return (
    <>
      {response && (
        <Box>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </Box>
      )}

      {!response && <Box>No response yet</Box>}
    </>
  );
}
