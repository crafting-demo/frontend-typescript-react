import { useState } from "react";

import { Button, ButtonGroup, TextField } from "@mui/material";

import { RandomInputString } from "./RandomJson";

export function MessageBuilderJSON() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setErrors("");
  };

  const handleGenerateRandomInput = () => {
    setValue(RandomInputString());
    setErrors("");
  };

  const handleClearInput = () => {
    setValue("");
    setErrors("");
  };

  const handleValidateInput = () => {
    try {
      JSON.parse(value);
    } catch (e) {
      setErrors(`${e}`);
      return;
    }
    // add validation to check Message interface
    setErrors("");
  };

  const handleSubmit = () => {
    handleValidateInput();
    if (errors !== "") {
      // return;
    }
    // handle submit via kafka client as producer
  };

  return (
    <>
      <TextField
        multiline
        autoFocus
        fullWidth
        minRows={25}
        maxRows={25}
        value={value}
        onChange={handleChange}
        variant="filled"
        error={errors !== ""}
        helperText={errors}
      />

      <ButtonGroup size="large" sx={{ marginTop: "10px" }}>
        <Button onClick={handleGenerateRandomInput}>
          Generate Random Input
        </Button>
        <Button onClick={handleClearInput}>Clear</Button>
        <Button onClick={handleValidateInput}>Validate</Button>
        <Button onClick={handleSubmit}>Send Request</Button>
      </ButtonGroup>
    </>
  );
}
