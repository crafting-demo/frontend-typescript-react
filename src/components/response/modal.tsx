import { Close as CloseIcon } from "@mui/icons-material";
import { Modal, Button } from "@mui/material";

import { Message } from "common/types";
import { FullScreenModal, InputField } from "components/common";

interface ResponseModalProps {
  open: boolean;
  onClose: () => void;
  message: Message;
}

export function ResponseModal(props: ResponseModalProps) {
  const { open, onClose, message } = props;

  const prettyJSON = JSON.stringify(message, null, 2);
  const lines = prettyJSON.split("\n").length + 50;

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

        <InputField
          readOnly
          rows={lines}
          value={prettyJSON}
          sx={{ width: "100%", overflow: "hidden" }}
        />
      </FullScreenModal>
    </Modal>
  );
}
