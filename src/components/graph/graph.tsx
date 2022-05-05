import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";

import { Message } from "common/types";
import { Render } from "components/graph/render";
import { colors } from "styles";

interface GraphParams {
  message: Message;
  open: boolean;
  onClose: () => void;
}

export function Graph(params: GraphParams) {
  const { message, open, onClose } = params;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          backgroundColor: colors.white[100],
          "::-webkit-scrollbar": {
            width: "4px",
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "#F1F1F1",
            borderRadius: "16px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#CCCCCC",
            borderRadius: "16px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#BDBDBD",
          },
        }}
      >
        <Button
          color="inherit"
          onClick={onClose}
          sx={{
            position: "fixed",
            right: "20px",
            top: "20px",
            zIndex: "1000",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CloseIcon />
        </Button>

        <Render message={message} />
      </Box>
    </Modal>
  );
}
