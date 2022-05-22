import { useState } from "react";

import { Send as SendIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Box } from "@mui/material";

import { Client } from "backend";
import { emptyMessage, RandomMessageChained } from "common/helpers";
import { useMobile, useResponse } from "common/hooks";
import { Action } from "common/types";
import { InteractiveBuilder } from "components/message/interactive";
import { logger } from "logger";

export function MessageBuilder() {
  const mobile = useMobile();
  const [message, setMessage] = useState(emptyMessage());
  const [, setResponse] = useResponse();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const [generate, setGenerate] = useState(false);
  const [clear, setClear] = useState(false);

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
      logger.WriteError("MessageBuilder", "missing location data", null);
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

  const handleChangeActive = (depth: number) => {
    setActive(depth);
  };

  const handleGenerate = () => {
    setMessage(RandomMessageChained());
    setGenerate(!generate);
  };

  const handleClear = () => {
    setMessage(emptyMessage());
    setClear(!clear);
  };

  const handleSend = async () => {
    setLoading(true);

    const client = new Client(message.meta.callee);
    const resp = await client.makeServiceCall({
      meta: {
        ...message.meta,
        callTime: new Date().toISOString(),
      },
      actions: message.actions,
    });
    if (resp) {
      setLoading(false);
      setResponse(resp);
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
        <LoadingButton
          onClick={handleSend}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          disabled={!message}
          sx={{ marginLeft: "10px" }}
        >
          Send
        </LoadingButton>
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
    </>
  );
}
