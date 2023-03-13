import { Box, SxProps, Theme } from "@mui/material";

import diagramBase from "assets/diagram-base.png";
import diagramDjangoDb from "assets/diagram-django-db.png";
import diagramDjango from "assets/diagram-django.png";
import diagramGinDb from "assets/diagram-gin-db.png";
import diagramGin from "assets/diagram-gin.png";
import diagramKafkaGinDb from "assets/diagram-kafka-gin-db.png";
import diagramKafkaGin from "assets/diagram-kafka-gin.png";
import diagramRailsDb from "assets/diagram-rails-db.png";
import diagramRails from "assets/diagram-rails.png";
import diagramSpringDb from "assets/diagram-spring-db.png";
import diagramSpring from "assets/diagram-spring.png";
import { BackendType, MessageType } from "common/types";

interface DiagramProps {
  backendType: BackendType | undefined;
  messageType: MessageType | undefined;
  sx: SxProps<Theme>;
}

const srcsNonDb: Record<BackendType, string> = {
  [BackendType.Gin]: diagramGin,
  [BackendType.Rails]: diagramRails,
  [BackendType.Spring]: diagramSpring,
  [BackendType.Django]: diagramDjango,
  [BackendType.GinKafka]: diagramKafkaGin,
};
const srcsWithDb: Record<BackendType, string> = {
  [BackendType.Gin]: diagramGinDb,
  [BackendType.Rails]: diagramRailsDb,
  [BackendType.Spring]: diagramSpringDb,
  [BackendType.Django]: diagramDjangoDb,
  [BackendType.GinKafka]: diagramKafkaGinDb,
};
const srcs: Record<MessageType, Record<BackendType, string>> = {
  [MessageType.Hello]: srcsNonDb,
  [MessageType.Echo]: srcsNonDb,
  [MessageType.Read]: srcsWithDb,
  [MessageType.Write]: srcsWithDb,
};

export function Diagram({ backendType, messageType, sx }: DiagramProps) {
  const src =
    (messageType && backendType
      ? srcs[messageType]?.[backendType]
      : diagramBase) || diagramBase;

  return (
    <Box
      component="img"
      src={src}
      alt="System Architecture"
      sx={{
        width: "100%",
        height: "auto",
        ...sx,
      }}
    />
  );
}
