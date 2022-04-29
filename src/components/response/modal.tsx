import { Close as CloseIcon } from "@mui/icons-material";
import { Modal, Button, TextField } from "@mui/material";

import { Message } from "common/types";
import { FullScreenModal } from "components/common";

interface ResponseModalProps {
  open: boolean;
  onClose: () => void;
  message: Message;
}

export function ResponseModal(props: ResponseModalProps) {
  const { open, onClose, message } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <FullScreenModal>
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
        <TextField
          multiline
          fullWidth
          aria-readonly
          variant="standard"
          value={JSON.stringify(message, null, 2)}
          sx={{
            "& .MuiInput-root": {
              "&:before, :after, :hover:not(.Mui-disabled):before": {
                borderBottom: 0,
              },
            },
          }}
        />
      </FullScreenModal>
    </Modal>
  );
}
