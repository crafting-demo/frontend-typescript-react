import { useState } from "react";

import { Box, TextField } from "@mui/material";

import { RandomInputString } from "./RandomJson";

export function MessageBuilderJSON() {
  const [value, setValue] = useState(RandomInputString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <TextField
        id="filled-multiline-flexible"
        multiline
        autoFocus
        fullWidth
        minRows={20}
        maxRows={30}
        value={value}
        onChange={handleChange}
        variant="filled"
        sx={{ fontFamily: "Fira Code" }}
      />
    </Box>
  );
}
