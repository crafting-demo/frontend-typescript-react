import { Button, InputBase, styled } from "@mui/material";

import { theme } from "styles/theme";

export const ServiceNameInput = styled(InputBase)(() => ({
  padding: "5px 0",
  width: "100%",
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${
      theme.palette.mode === "light" ? "#eaecef" : "#30363d"
    }`,
    fontSize: 14,
    "&:focus": {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === "light"
          ? "rgba(3, 102, 214, 0.3)"
          : "rgb(12, 45, 107)"
      }`,
      borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
    },
  },
}));

export const SubmitButton = styled(Button)(() => ({
  height: "40px",
  marginTop: "4px",
  marginLeft: "10px",
  padding: 8,
  color: "#30363d",
  textTransform: "capitalize",
  borderRadius: 4,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
  transition: theme.transitions.create(["border-color", "box-shadow"]),
  border: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
  fontSize: 14,
  "&:hover": {
    boxShadow: `0px 0px 0px 3px ${
      theme.palette.mode === "light"
        ? "rgba(3, 102, 214, 0.3)"
        : "rgb(12, 45, 107)"
    }`,
    borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
  },
}));
