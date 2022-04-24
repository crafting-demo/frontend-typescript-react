import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { Topic } from "common";

export function Response() {
  const [reactMessages, setReactMessages] = useState<string[]>([]);
  const [goMessages, setGoMessages] = useState<string[]>([]);
  const [expressMessages, setExpressMessages] = useState<string[]>([]);
  const [railsMessages, setRailsMessages] = useState<string[]>([]);
  const [kotlinMessages, setKotlinMessages] = useState<string[]>([]);
  const [pythonMessages, setPythonMessages] = useState<string[]>([]);

  const url = `${process.env.REACT_APP_BROKER_SERVICE_ADDR}`.replace(
    /^http/,
    "ws"
  );

  useEffect(() => {
    const socket = new WebSocket(`${url}/consumer/${Topic.React}`);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      setReactMessages([msg, ...reactMessages]);
    };

    return () => {
      socket.close();
    };
  }, [reactMessages]);

  useEffect(() => {
    const socket = new WebSocket(`${url}/consumer/${Topic.Go}`);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      setGoMessages([msg, ...goMessages]);
    };

    return () => {
      socket.close();
    };
  }, [goMessages]);

  useEffect(() => {
    const socket = new WebSocket(`${url}/consumer/${Topic.Express}`);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      setExpressMessages([msg, ...expressMessages]);
    };

    return () => {
      socket.close();
    };
  }, [expressMessages]);

  useEffect(() => {
    const socket = new WebSocket(`${url}/consumer/${Topic.Rails}`);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      setRailsMessages([msg, ...railsMessages]);
    };

    return () => {
      socket.close();
    };
  }, [railsMessages]);

  useEffect(() => {
    const socket = new WebSocket(`${url}/consumer/${Topic.Kotlin}`);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      setKotlinMessages([msg, ...kotlinMessages]);
    };

    return () => {
      socket.close();
    };
  }, [kotlinMessages]);

  useEffect(() => {
    const socket = new WebSocket(`${url}/consumer/${Topic.Python}`);

    socket.onmessage = (event) => {
      const msg = event.data as string;
      setPythonMessages([msg, ...pythonMessages]);
    };

    return () => {
      socket.close();
    };
  }, [pythonMessages]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "50px 0",
      }}
    >
      <Box>
        {reactMessages.length && (
          <>
            {reactMessages.forEach((message) => (
              <Box>{message}</Box>
            ))}
          </>
        )}
      </Box>

      <Box>
        {goMessages.length && (
          <>
            {goMessages.forEach((message) => (
              <Box>{message}</Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
