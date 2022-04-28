import { useState } from "react";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Message } from "common/types";

import { MessageBuilderInteractive } from "./interactive";
import { MessageBuilderJSON } from "./json";

enum MessageBuilderType {
  Interactive = "interactive",
  JSON = "json",
}

interface MessageBuilderParams {
  onCallback: (message: Message) => void;
}

export function MessageBuilder(params: MessageBuilderParams) {
  const { onCallback } = params;
  const [builderType, setBuilderType] = useState(MessageBuilderType.JSON);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newBuilderType: MessageBuilderType
  ) => {
    if (Object.values(MessageBuilderType).includes(newBuilderType)) {
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
          <ToggleButton value={MessageBuilderType.Interactive}>
            Interactive
          </ToggleButton>
          <ToggleButton value={MessageBuilderType.JSON}>JSON</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {builderType === MessageBuilderType.Interactive && (
        <MessageBuilderInteractive />
      )}
      {builderType === MessageBuilderType.JSON && (
        <MessageBuilderJSON onCallback={onCallback} />
      )}
    </>
  );
}
