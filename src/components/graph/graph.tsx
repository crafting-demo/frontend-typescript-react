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
          opacity: "0.9",
          overflowY: "auto",
          backgroundColor: colors.white[0],
        }}
      >
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>

        <Render message={message} />
      </Box>
    </Modal>
  );
}
