import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import ReactJson from "react-json-view";

import { useResponse } from "common/hooks";

export function ResponseBuilder() {
  const [response] = useResponse();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!response.meta.returnTime) {
      setDisplay(false);
      return;
    }
    setDisplay(true);
  }, [response.meta.returnTime]);

  return (
    <Box sx={{ width: "100%", padding: "50px 20px" }}>
      {display && (
        <ReactJson name="response" src={response} displayDataTypes={false} />
      )}

      {!display && (
        <ReactJson name="response" src={response} displayDataTypes={false} />
      )}
    </Box>
  );
}
