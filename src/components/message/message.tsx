import { useState } from "react";

import { Autocomplete, Box } from "@mui/material";

import { emptyMessage } from "common/helpers";
import { ServiceType } from "common/types";
import { ServiceNameInput, SubmitButton } from "components/message/common";

export function MessageBuilder() {
  const [message, setMessage] = useState(emptyMessage());
  const [callee, setCallee] = useState("");

  const handleChangeCallee = (_event: any, value: string | null) => {
    setMessage({
      meta: {
        caller: message.meta.caller,
        callee: value || "",
      },
      actions: message.actions,
    });
  };

  // const handleChangeActions = (actions: Action[]) => {
  //   setMessage({
  //     meta: {
  //       caller: message.meta.caller,
  //       callee: message.meta.callee,
  //     },
  //     actions,
  //   });
  // };

  // const handleSubmit = async () => {
  //   message.meta.callTime = new Date().toISOString();
  //   const client = new Client(message.meta.callee);
  //   const resp = await client.makeServiceCall(message);
  //   if (resp) {
  //     // trigger graph renderer
  //   }
  // };

  return (
    <Box sx={{ padding: "20px 10px" }}>
      <Box sx={{ display: "flex", marginBottom: "20px" }}>
        <Autocomplete
          disablePortal
          value={message.meta.callee || null}
          onChange={handleChangeCallee}
          inputValue={callee}
          onInputChange={(_event, newCallee) => {
            setCallee(newCallee);
          }}
          options={Object.values(ServiceType).filter(
            (name) => name !== ServiceType.React
          )}
          renderInput={(params) => (
            <ServiceNameInput
              required
              autoFocus
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              placeholder="Select backend service to call"
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <SubmitButton>Send</SubmitButton>
      </Box>

      {/* <ActionsBuilder message={message} onCallback={handleChangeActions} /> */}
    </Box>
  );
}
