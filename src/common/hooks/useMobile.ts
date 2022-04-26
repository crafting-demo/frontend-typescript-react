import { Theme, useMediaQuery } from "@mui/material";

export const useMobile = () =>
  useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
