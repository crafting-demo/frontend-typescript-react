import { Box, styled, Typography } from "@mui/material";

export const Container = styled(Box)(() => ({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  paddingLeft: "10px",
  paddingRight: "10px",
}));

export const Title = styled(Typography)(() => ({
  padding: "20px 0",
  fontSize: "30px",
}));
