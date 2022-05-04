import { useState } from "react";

import { Snackbar, Alert, Button, ButtonGroup } from "@mui/material";

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
  const [response, setResponse] = useState<Message | null>(null);
  const [launchGraph, setLaunchGraph] = useState(false);

  const findCallee = (actions: Action[], location: number[]): string => {
    if (!location.length) {
      return message.meta.callee;
    }
    if (location.length === 1) {
      return actions[location[0]]?.payload?.serviceName || "";
    }
    return findCallee(
      actions[location[0]]?.payload?.actions || [],
      location.slice(1)
    );
  };

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
  };

  const handleValidate = () => {
    validateMessage();
    handleOpenSnackbar();
  };

  const handleClear = () => {
    setMessage(emptyMessage());
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
      <ButtonGroup
        variant="text"
        orientation={mobile ? "vertical" : "horizontal"}
        sx={{
          marginBottom: "20px",
          "& button": {
            marginRight: "20px",
            border: "none !important",
          },
        }}
      >
        <Button onClick={handleGenerate}>Generate</Button>
        <Button onClick={handleValidate} disabled={!message}>
          Validate
        </Button>
        <Button onClick={handleClear} disabled={!message}>
          Clear
        </Button>
        <Button onClick={handleSend} disabled={!message}>
          Send
        </Button>
      </ButtonGroup>

      <InteractiveBuilder
        message={message}
        actions={message.actions}
        location={[]}
        activeDepth={active}
        currentDepth={0}
        onChange={{
          findCallee,
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
