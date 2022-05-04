import { useRef, useState, useEffect } from "react";

import { Box } from "@mui/material";
import Tree from "react-d3-tree";

import { Action, Message, ActionType } from "common/types";

interface TreeData {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  children?: TreeData[];
}

interface RenderParams {
  message: Message;
}

export function Render(params: RenderParams) {
  const { message } = params;
  const treeContainerRef = useRef<HTMLElement>(null);
  const [treeTranslate, setTreeTranslate] = useState({ x: 0, y: 0 });

  const treeData = (actions?: Action[]): TreeData[] => {
    if (!actions) {
      return [
        {
          name: message.meta.caller,
          children: [
            {
              name: message.meta.callee,
              children: treeData(message.actions),
            },
          ],
        },
      ];
    }
    return actions.map((action) => {
      switch (action.action) {
        case ActionType.Echo:
          return {
            name: "Echo",
          };
        case ActionType.Read:
          return {
            name: action.payload.serviceName || "",
          };
        case ActionType.Write:
          return {
            name: action.payload.serviceName || "",
          };
        case ActionType.Call:
          return {
            name: action.payload.serviceName || "",
            children: treeData(action.payload.actions),
          };
        default:
          break;
      }
      return {
        name: "",
      };
    });
  };

  useEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();

      setTreeTranslate({
        x: dimensions.width / 2,
        y: 100,
      });
    }
  });

  return (
    <Box
      ref={treeContainerRef}
      sx={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Tree
        data={treeData()}
        orientation="vertical"
        collapsible={false}
        translate={treeTranslate}
      />
    </Box>
  );
}
