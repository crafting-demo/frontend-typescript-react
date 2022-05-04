import { useState } from "react";

import { emptyMessage } from "common/helpers";
import { Action } from "common/types";
import { InteractiveBuilder } from "components/message/interactive";
import { logger } from "logger";

export function MessageBuilder() {
  const [message, setMessage] = useState(emptyMessage());
  const [active, setActive] = useState(-1);

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

  return (
    <>
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

      {JSON.stringify(message)}
    </>
  );
}
