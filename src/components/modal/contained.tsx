import {
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { Action, StatusType } from "common/types";
import { colors } from "styles";

interface ContainedModalProps {
  open: boolean;
  onClose: () => void;
  action: Action;
}

export function ContainedModal(props: ContainedModalProps) {
  const { open, onClose, action } = props;

  const statusTheme = action.status === StatusType.Passed ? "success" : "error";

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          bgcolor: colors.white[100],
          borderRadius: "5px",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TableContainer sx={{ padding: "20px" }}>
            <Table
              sx={{
                "& tr td": {
                  borderBottom: "none !important",
                },
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  <TableCell>{action.action}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Service Name
                  </TableCell>
                  <TableCell>{action.payload.serviceName}</TableCell>
                </TableRow>

                {action.payload.key && (
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Key</TableCell>
                    <TableCell>{action.payload.key}</TableCell>
                  </TableRow>
                )}

                {action.payload.value && (
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
                    <TableCell>{action.payload.value}</TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Return Time</TableCell>
                  <TableCell>
                    {action.returnTime &&
                      new Date(action.returnTime).toLocaleString()}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Op Status</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        color: `${statusTheme}.main`,
                        textTransform: "uppercase",
                      }}
                    >
                      {action.status}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  );
}
