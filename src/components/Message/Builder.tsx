import { useState } from "react";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { MessageBuilderInteractive } from "./BuilderInteractive";
import { MessageBuilderJSON } from "./BuilderJson";

enum MessageBuilderType {
  Interactive = "interactive",
  JSON = "json",
  YAML = "yaml",
}

export function MessageBuilder() {
  const [builderType, setBuilderType] = useState(
    MessageBuilderType.Interactive
  );

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBuilderType: MessageBuilderType
  ) => {
    if (Object.values(MessageBuilderType).includes(newBuilderType)) {
      setBuilderType(newBuilderType);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px 10px",
      }}
    >
      <Box sx={{ padding: "0 0 10px 0" }}>
        <ToggleButtonGroup
          color="primary"
          value={builderType}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value={MessageBuilderType.Interactive}>
            Interactive
          </ToggleButton>
          <ToggleButton value={MessageBuilderType.JSON}>JSON</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {builderType === MessageBuilderType.Interactive && (
        <MessageBuilderInteractive />
      )}
      {builderType === MessageBuilderType.JSON && <MessageBuilderJSON />}
    </Box>
  );
}
