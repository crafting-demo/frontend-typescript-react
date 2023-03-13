import {
  alpha,
  styled,
  TextFieldProps,
  TextField,
  OutlinedInputProps,
  Box,
} from "@mui/material";

import { colors } from "styles";

export const TextFieldInput = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  display: "block",
  marginRight: "10px",
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "transparent",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const InteractiveBlockWrapper = styled(Box)(() => ({
  marginTop: "20px",
  padding: "20px 5px",
  display: "block",
  borderLeft: `3px solid ${colors.silver[100]}`,
}));

export const SubFieldWrapper = styled(Box)(
  ({ expanded, mobile }: { expanded: boolean; mobile: number }) => ({
    display: expanded ? "flex" : "none",
    overflow: expanded ? "auto" : "hidden",
    maxHeight: expanded ? "100vh" : 0,
    transition: "max-height 1s ease-in-out",
    flexDirection: "column",
    gap: "8px",
    paddingLeft: mobile ? 0 : "28px",
  })
);
