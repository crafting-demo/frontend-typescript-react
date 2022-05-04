import { Add as AddIcon } from "@mui/icons-material";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

import { Message, ActionType, Action } from "common/types";
import {
  TextFieldInput,
  InteractiveBlockWrapper,
} from "components/message/common";

interface UpdateMessageMethods {
  findCallee: (actions: Action[], location: number[]) => string;
  updateCallee: (value: string) => void;
  createAction: (location: number[]) => void;
  updateActions: (attr: string, value: string, location: number[]) => void;
  setActiveDepth: (depth: number) => void;
}

interface InteractiveBuilderParams {
  message: Message;
  actions: Action[];
  location: number[];
  activeDepth: number;
  currentDepth: number;
  onChange: UpdateMessageMethods;
}

export function InteractiveBuilder(params: InteractiveBuilderParams) {
  const { message, actions, location, activeDepth, currentDepth, onChange } =
    params;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextFieldInput
          label="Backend service"
          variant="filled"
          value={onChange.findCallee(message.actions, location)}
          onChange={(e) =>
            !location.length
              ? onChange.updateCallee(e.target.value)
              : onChange.updateActions(
                  "payload.serviceName",
                  e.target.value,
                  location
                )
          }
          onFocus={() => onChange.setActiveDepth(currentDepth)}
          style={{ marginTop: 11 }}
        />
      </Box>

      <InteractiveBlockWrapper
        sx={{
          borderColor: activeDepth === currentDepth ? "primary.main" : "auto",
        }}
      >
        {actions.map((action, i) => (
          <Box sx={{ marginBottom: "20px" }}>
            <FormControl sx={{ paddingLeft: "5px" }}>
              <RadioGroup
                row
                value={action.action}
                onChange={(e) =>
                  onChange.updateActions(
                    "action",
                    e.target.value,
                    location.concat(i)
                  )
                }
                onFocus={() => onChange.setActiveDepth(currentDepth)}
              >
                <FormControlLabel
                  value={ActionType.Echo}
                  control={<Radio size="small" />}
                  label={ActionType.Echo}
                />
                <FormControlLabel
                  value={ActionType.Read}
                  control={<Radio size="small" />}
                  label={ActionType.Read}
                />
                <FormControlLabel
                  value={ActionType.Write}
                  control={<Radio size="small" />}
                  label={ActionType.Write}
                />
                <FormControlLabel
                  value={ActionType.Call}
                  control={<Radio size="small" />}
                  label={ActionType.Call}
                />
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {action.action === ActionType.Echo && (
                <TextFieldInput
                  label="Echo back text"
                  variant="filled"
                  value={action.payload.value}
                  onChange={(e) =>
                    onChange.updateActions(
                      "payload.value",
                      e.target.value,
                      location.concat(i)
                    )
                  }
                  style={{ marginTop: 11 }}
                />
              )}

              {action.action === ActionType.Read && (
                <>
                  <TextFieldInput
                    label="Entity store"
                    variant="filled"
                    value={action.payload.serviceName}
                    onChange={(e) =>
                      onChange.updateActions(
                        "payload.serviceName",
                        e.target.value,
                        location.concat(i)
                      )
                    }
                    onFocus={() => onChange.setActiveDepth(currentDepth)}
                    style={{ marginTop: 11 }}
                  />
                  <TextFieldInput
                    label="Key"
                    variant="filled"
                    value={action.payload.key}
                    onChange={(e) =>
                      onChange.updateActions(
                        "payload.key",
                        e.target.value,
                        location.concat(i)
                      )
                    }
                    onFocus={() => onChange.setActiveDepth(currentDepth)}
                    style={{ marginTop: 11 }}
                  />
                </>
              )}

              {action.action === ActionType.Write && (
                <>
                  <TextFieldInput
                    label="Entity store"
                    variant="filled"
                    value={action.payload.serviceName}
                    onChange={(e) =>
                      onChange.updateActions(
                        "payload.serviceName",
                        e.target.value,
                        location.concat(i)
                      )
                    }
                    onFocus={() => onChange.setActiveDepth(currentDepth)}
                    style={{ marginTop: 11 }}
                  />
                  <TextFieldInput
                    label="Key"
                    variant="filled"
                    value={action.payload.key}
                    onChange={(e) =>
                      onChange.updateActions(
                        "payload.key",
                        e.target.value,
                        location.concat(i)
                      )
                    }
                    onFocus={() => onChange.setActiveDepth(currentDepth)}
                    style={{ marginTop: 11 }}
                  />
                  <TextFieldInput
                    label="Value"
                    variant="filled"
                    value={action.payload.value}
                    onChange={(e) =>
                      onChange.updateActions(
                        "payload.value",
                        e.target.value,
                        location.concat(i)
                      )
                    }
                    onFocus={() => onChange.setActiveDepth(currentDepth)}
                    style={{ marginTop: 11 }}
                  />
                </>
              )}

              {action.action === ActionType.Call && (
                <InteractiveBuilder
                  message={message}
                  actions={action.payload.actions || []}
                  location={location.concat(i)}
                  activeDepth={activeDepth}
                  currentDepth={currentDepth + 1}
                  onChange={onChange}
                />
              )}
            </Box>
          </Box>
        ))}

        <Box>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={() => {
              onChange.createAction(location);
              onChange.setActiveDepth(currentDepth);
            }}
          >
            New Action
          </Button>
        </Box>
      </InteractiveBlockWrapper>
    </>
  );
}
