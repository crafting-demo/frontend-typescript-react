import { useEffect, useRef, useState } from "react";

import { Box, Typography } from "@mui/material";
import { AnimatedTree } from "react-tree-graph";

import { uniqueKey } from "common/helpers";
import { Action, Message, ActionType } from "common/types";
import { colors } from "styles";

interface TreeData {
  name: string;
  label: JSX.Element;
  children?: TreeData[];
}

interface RenderParams {
  message: Message;
}

export function Render(params: RenderParams) {
  const wrapperRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);

  const { message } = params;

  const formatServiceName = (serviceName?: string): string => {
    const parts = serviceName?.split("-");
    if (!parts || parts.length < 3) {
      return serviceName || "";
    }
    return `${parts
      .slice(-1)
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))}`;
  };

  const treeData = (actions?: Action[]): TreeData[] => {
    if (!actions) {
      return [
        {
          name: uniqueKey(),
          label: (
            <text dx="-10" dy="-15" fill={colors.green[100]}>
              React
            </text>
          ),
          children: [
            {
              name: uniqueKey(),
              label: (
                <text dx="-20" dy="-15" fill={colors.violet[100]}>
                  {formatServiceName(message.meta.callee)}
                </text>
              ),
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
            name: uniqueKey(),
            label: (
              <text dx="5" fill={colors.pink[100]}>
                Echo
              </text>
            ),
          };
        case ActionType.Read:
          return {
            name: uniqueKey(),
            label: (
              <text dx="5" fill={colors.pink[100]}>
                {action.payload.serviceName}
              </text>
            ),
          };
        case ActionType.Write:
          return {
            name: uniqueKey(),
            label: (
              <text dx="5" fill={colors.pink[100]}>
                {action.payload.serviceName}
              </text>
            ),
          };
        case ActionType.Call:
          return {
            name: uniqueKey(),
            label: (
              <text dx="-20" dy="-15" fill={colors.violet[100]}>
                {formatServiceName(action.payload.serviceName)}
              </text>
            ),
            children: treeData(action.payload.actions),
          };
        default:
          break;
      }
      return {
        name: uniqueKey(),
        label: <>Unknown</>,
      };
    });
  };

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const dimensions = wrapperRef.current.getBoundingClientRect();
    setWindowWidth(dimensions.width);
    setWindowHeight(dimensions.height);
  }, [wrapperRef.current]);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        display: "block",
        width: "100vw",
        height: "100vh",
        "& .node": {
          cursor: "pointer",
        },
        "& .node circle": {
          fill: colors.white[100],
          stroke: colors.violet[100],
          strokeWidth: "4px",
        },
        "& .node text": {
          fontSize: "14px",
          fontWeight: "bold",
        },
        "& path.link": {
          fill: "none",
          stroke: colors.violet[100],
          strokeWidth: "4px",
        },
      }}
    >
      <AnimatedTree
        data={treeData()[0]}
        width={windowWidth}
        height={windowHeight}
        labelProp="label"
      />

      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: colors.violet[100],
          fontWeight: "bold",
        }}
      >
        Request completed in{" "}
        {(Date.parse(message.meta.returnTime!) -
          Date.parse(message.meta.callTime!)) /
          1000}
        s
      </Typography>
    </Box>
  );
}
