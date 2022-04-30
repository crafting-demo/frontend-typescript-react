import { Close as CloseIcon } from "@mui/icons-material";
import { Modal, Button, Box } from "@mui/material";

import { Message } from "common/types";
import { InputField } from "components/common";
import { colors } from "styles/palette";

interface FullScreenModalProps {
  open: boolean;
  onClose: () => void;
  message: Message;
}

export function FullScreenModal(props: FullScreenModalProps) {
  const { open, onClose, message } = props;

  const prettyJSON = JSON.stringify(message, null, 2);
  const lines = prettyJSON.split("\n").length + 20;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: "0.9",
          top: "0",
          left: "0",
          padding: "20px 0",
          overflow: "auto",
          backgroundColor: colors.white[0],
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

        <InputField
          readOnly
          rows={lines}
          value={prettyJSON}
          sx={{ width: "100%", padding: "0 20px", overflow: "auto" }}
        />
      </Box>
    </Modal>
  );
}
