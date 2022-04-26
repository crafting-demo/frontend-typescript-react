import { useState } from "react";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { ResponseBuilderInteractive } from "./interactive";
import { ResponseBuilderJSON } from "./json";

enum ResponseBuilderType {
  Interactive = "interactive",
  JSON = "json",
}

export function Response() {
  const [builderType, setBuilderType] = useState(
    ResponseBuilderType.Interactive
  );

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBuilderType: ResponseBuilderType
  ) => {
    if (Object.values(ResponseBuilderType).includes(newBuilderType)) {
      setBuilderType(newBuilderType);
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={builderType}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value={ResponseBuilderType.Interactive}>
            Interactive
          </ToggleButton>
          <ToggleButton value={ResponseBuilderType.JSON}>JSON</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {builderType === ResponseBuilderType.Interactive && (
        <ResponseBuilderInteractive />
      )}
      {builderType === ResponseBuilderType.JSON && <ResponseBuilderJSON />}
    </>
  );
}
