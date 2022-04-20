import { useState } from "react";

import { Button, ButtonGroup, TextField } from "@mui/material";

import { RandomInputString } from "./RandomJson";

export function MessageBuilderJSON() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
    setErrors("");
  };

  const handleSubmit = async () => {
    handleValidateInput();
    if (errors !== "") {
      return;
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
        inputProps={{ style: { fontFamily: "Fira Mono" } }}
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