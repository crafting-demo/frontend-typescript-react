import { useEffect, useState } from "react";

import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  MenuItem,
} from "@mui/material";

import {
  Action,
  Message,
  ActionType,
  ServiceType,
  DependencyType,
} from "common/types";
import {
  TextFieldInput,
  InteractiveBlockWrapper,
} from "components/message/common";

export interface UpdateMessageMethods {
  updateCallee: (value: string) => void;
  createAction: (location: number[]) => void;
  updateActions: (attr: string, value: string, location: number[]) => void;
  setActiveDepth: (depth: number) => void;
}

export interface InteractiveBuilderParams {
  message: Message;
  actions: Action[];
  location: number[];
  activeDepth: number;
  currentDepth: number;
  generate: boolean;
  clear: boolean;
  onChange: UpdateMessageMethods;
}

export function InteractiveBuilder(params: InteractiveBuilderParams) {
  const [backendService, setBackendService] = useState(ServiceType.Gin);

  const handleChangeBackendService = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBackendService(event.target.value as ServiceType);
  };

  const {
    message,
    actions,
    location,
    activeDepth,
    currentDepth,
    generate,
    clear,
    onChange,
  } = params;

  const findCallee = (acts: Action[], locs: number[]): string => {
    if (!locs.length) {
      return message.meta.callee;
    }
    if (locs.length === 1) {
      return acts[locs[0]]?.payload?.serviceName || "";
    }
    return findCallee(acts[locs[0]]?.payload?.actions || [], locs.slice(1));
  };

  useEffect(() => {
    setBackendService(findCallee(message.actions, location) as ServiceType);
  }, [generate]);

  useEffect(() => {
    setBackendService(ServiceType.Gin);
  }, [clear]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TextFieldInput
          label="Backend service"
          select
          variant="filled"
          value={backendService}
          onChange={handleChangeBackendService}
          onBlur={() =>
            !location.length
              ? onChange.updateCallee(backendService)
              : onChange.updateActions(
                  "payload.serviceName",
                  backendService,
                  location
                )
          }
          onFocus={() => onChange.setActiveDepth(currentDepth)}
          style={{ marginTop: 11 }}
        >
          {Object.values(ServiceType)
            .filter((value) => value !== ServiceType.React)
            .map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
        </TextFieldInput>
      </Box>

      <InteractiveBlockWrapper
        sx={{
          borderColor: activeDepth === currentDepth ? "primary.main" : "auto",
        }}
      >
        {actions.map((action, i) => (
          <InteractiveBlock
            message={message}
            action={action}
            index={i}
            location={location}
            activeDepth={activeDepth}
            currentDepth={currentDepth}
            generate={generate}
            clear={clear}
            onChange={onChange}
            key={i} // eslint-disable-line react/no-array-index-key
          />
        ))}

        <Box>
          <Button
            variant="text"
            startIcon={<AddCircleIcon />}
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

export interface InteractiveBlockParams {
  message: Message;
  action: Action;
  index: number;
  location: number[];
  activeDepth: number;
  currentDepth: number;
  generate: boolean;
  clear: boolean;
  onChange: UpdateMessageMethods;
}

export function InteractiveBlock(params: InteractiveBlockParams) {
  const {
    message,
    action,
    index,
    location,
    activeDepth,
    currentDepth,
    generate,
    clear,
    onChange,
  } = params;

  const [serviceName, setServiceName] = useState(DependencyType.MySQL);
  const [key, setKey] = useState(action.payload.key || "");
  const [value, setValue] = useState(action.payload.value || "");
  const [trackGenerate, setTrackGenerate] = useState(false);

  const handleChangeServiceName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setServiceName(event.target.value as DependencyType);
  };

  const handleChangeKey = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setKey(event.target.value);
  };

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setTrackGenerate(generate);
    setServiceName(
      (action.payload.serviceName as DependencyType) || DependencyType.MySQL
    );
    setKey(action.payload.key || "");
    setValue(action.payload.value || "");
  }, [generate]);

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <FormControl sx={{ paddingLeft: "5px" }}>
        <RadioGroup
          row
          value={action.action}
          onChange={(e) =>
            onChange.updateActions(
              "action",
              e.target.value,
              location.concat(index)
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
            value={value}
            onChange={handleChangeValue}
            onBlur={() =>
              onChange.updateActions(
                "payload.value",
                value,
                location.concat(index)
              )
            }
            onFocus={() => onChange.setActiveDepth(currentDepth)}
            style={{ marginTop: 11 }}
          />
        )}

        {action.action === ActionType.Read && (
          <>
            <TextFieldInput
              select
              label="Entity store"
              variant="filled"
              value={serviceName}
              onChange={handleChangeServiceName}
              onBlur={() =>
                onChange.updateActions(
                  "payload.serviceName",
                  serviceName,
                  location.concat(index)
                )
              }
              onFocus={() => onChange.setActiveDepth(currentDepth)}
              style={{ marginTop: 11 }}
            >
              {Object.values(DependencyType).map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </TextFieldInput>
            <TextFieldInput
              label="Key"
              variant="filled"
              value={key}
              onChange={handleChangeKey}
              onBlur={() =>
                onChange.updateActions(
                  "payload.key",
                  key,
                  location.concat(index)
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
              select
              label="Entity store"
              variant="filled"
              value={serviceName}
              onChange={handleChangeServiceName}
              onBlur={() =>
                onChange.updateActions(
                  "payload.serviceName",
                  serviceName,
                  location.concat(index)
                )
              }
              onFocus={() => onChange.setActiveDepth(currentDepth)}
              style={{ marginTop: 11 }}
            >
              {Object.values(DependencyType).map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </TextFieldInput>
            <TextFieldInput
              label="Key"
              variant="filled"
              value={key}
              onChange={handleChangeKey}
              onBlur={() =>
                onChange.updateActions(
                  "payload.key",
                  key,
                  location.concat(index)
                )
              }
              onFocus={() => onChange.setActiveDepth(currentDepth)}
              style={{ marginTop: 11 }}
            />
            <TextFieldInput
              label="Value"
              variant="filled"
              value={value}
              onChange={handleChangeValue}
              onBlur={() =>
                onChange.updateActions(
                  "payload.value",
                  value,
                  location.concat(index)
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
            location={location.concat(index)}
            activeDepth={activeDepth}
            currentDepth={currentDepth + 1}
            generate={trackGenerate}
            clear={clear}
            onChange={onChange}
          />
        )}
      </Box>
    </Box>
  );
}
