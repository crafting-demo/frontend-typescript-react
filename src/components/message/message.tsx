import { useState } from "react";

import { Send as SendIcon } from "@mui/icons-material";
import { Snackbar, Alert, Button, Box } from "@mui/material";

import { Client } from "backend";
import { emptyMessage, RandomMessage, ValidateMessage } from "common/helpers";
import { useMobile } from "common/hooks";
import { Action, Message } from "common/types";
import { Graph } from "components/graph";
import { InteractiveBuilder } from "components/message/interactive";
import { logger } from "logger";

export function MessageBuilder() {
  const mobile = useMobile();
  const [message, setMessage] = useState(emptyMessage());
  const [errors, setErrors] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [active, setActive] = useState(-1);
  const [generate, setGenerate] = useState(false);
  const [clear, setClear] = useState(false);
  const [response, setResponse] = useState<Message | null>(null);
  const [launchGraph, setLaunchGraph] = useState(false);

  const createAction = (actions: Action[], location: number[]): Action[] => {
    if (!location.length) {
      return [...actions, { action: "", payload: {} }];
    }
    return actions.map((action, i) => {
      if (i === location[0]) {
        return {
          ...action,
          payload: {
            ...action.payload,
            actions: createAction(
              action.payload.actions || [],
              location.slice(1)
            ),
          },
        };
      }
      return action;
    });
  };

  const updateActions = (
    actions: Action[],
    attr: string,
    value: string,
    location: number[]
  ): Action[] => {
    if (!location.length) {
      logger.write("MessageBuilder", "missing location data", null);
      return [];
    }
    if (location.length === 1) {
      return actions.map((action, i) => {
        if (i === location[0]) {
          const attrs = attr.split(".");
          if (attrs.length === 1) {
            return {
              ...action,
              [attr]: value,
            };
          }
          return {
            ...action,
            payload: {
              ...action.payload,
              [attrs[1]]: value,
            },
          };
        }
        return action;
      });
    }
    return actions.map((action, i) => {
      if (i === location[0]) {
        return {
          ...action,
          payload: {
            ...action.payload,
            actions: updateActions(
              action.payload.actions || [],
              attr,
              value,
              location.slice(1)
            ),
          },
        };
      }
      return action;
    });
  };

  const validateMessage = (): boolean => {
    const err = ValidateMessage(JSON.stringify(message));
    if (err.length > 0) {
      setErrors(`Error: ${err.join(", ")}`);
      return false;
    }
    setErrors("");
    return true;
  };

  const handleChangeCallee = (value: string) => {
    setMessage({
      meta: {
        ...message.meta,
        callee: value,
      },
      actions: message.actions,
    });
  };

  const handleChangeActions = (
    attr: string,
    value: string,
    location: number[]
  ) => {
    setMessage({
      meta: message.meta,
      actions: updateActions(message.actions, attr, value, location),
    });
  };

  const handleCreateAction = (location: number[]) => {
    setMessage({
      meta: message.meta,
      actions: createAction(message.actions, location),
    });
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangeActive = (depth: number) => {
    setActive(depth);
  };

  const handleGenerate = () => {
    setMessage(RandomMessage());
    setGenerate(!generate);
  };

  const handleClear = () => {
    setMessage(emptyMessage());
    setClear(!clear);
  };

  const handleSend = async () => {
    const valid = validateMessage();
    if (!valid) {
      handleOpenSnackbar();
      return;
    }
    const client = new Client(message.meta.callee);
    const resp = await client.makeServiceCall({
      meta: {
        ...message.meta,
        callTime: new Date().toISOString(),
      },
      actions: message.actions,
    });
    if (resp) {
      setResponse(resp);
      setLaunchGraph(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          marginBottom: "35px",
          "& button": {
            marginRight: "20px",
          },
        }}
      >
        <Button variant="text" onClick={handleGenerate}>
          Generate
        </Button>
        <Button variant="text" onClick={handleClear} disabled={!message}>
          Clear
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          disabled={!message}
          sx={{ marginLeft: "10px" }}
        >
          Send
        </Button>
      </Box>

      <InteractiveBuilder
        message={message}
        actions={message.actions}
        location={[]}
        activeDepth={active}
        currentDepth={0}
        generate={generate}
        clear={clear}
        onChange={{
          updateCallee: handleChangeCallee,
          createAction: handleCreateAction,
          updateActions: handleChangeActions,
          setActiveDepth: handleChangeActive,
        }}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errors ? "error" : "success"}
        >
          {errors || "Validation passed"}
        </Alert>
      </Snackbar>

      {response && (
        <Graph
          message={response}
          open={launchGraph}
          onClose={() => setLaunchGraph(false)}
        />
      )}
    </>
  );
}
