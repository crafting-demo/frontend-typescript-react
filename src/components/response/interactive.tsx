import { useEffect, useState } from "react";

import { generateUniqueID } from "common/helpers";
import { Consumer } from "common/kafka-client";
import { Message, Topic } from "common/types";
import {
  InteractiveResponseBadge,
  InteractiveResponseBlock,
  InteractiveResponseLine,
  InteractiveResponseWrapper,
} from "components/common";
import { colors } from "styles/palette";

export interface MessageBlock {
  message: Message;
  from: number;
  to: number;
  horizontalOffset: number;
  verticalOffset: number;
}

export function ResponseBuilderInteractive() {
  const [reactBlocks, setReactBlocks] = useState<MessageBlock[]>([]);
  const [reactMessage, setReactMessage] = useState("");

  const handleChangeReactMessage = (message: string) => {
    setReactMessage(message);
  };

  useEffect(() => {
    const consumerReact = new Consumer(Topic.React);
    consumerReact.start(handleChangeReactMessage);
  }, []);

  useEffect(() => {
    if (!reactMessage) {
      return;
    }
    const msg = JSON.parse(reactMessage) as Message;
    let vertical = 0;
    switch (msg.meta.callee) {
      case Topic.React:
        vertical = 85;
        break;
      case Topic.Go:
        vertical = 185;
        break;
      case Topic.Express:
        vertical = 285;
        break;
      case Topic.Rails:
        vertical = 385;
        break;
      case Topic.Kotlin:
        vertical = 485;
        break;
      case Topic.Python:
        vertical = 585;
        break;
      default:
        break;
    }
    const block: MessageBlock = {
      message: msg,
      from: 0,
      to: 0,
      horizontalOffset: 50 * (reactBlocks.length + 1),
      verticalOffset: vertical,
    };
    setReactBlocks(reactBlocks.concat(block));
  }, [reactMessage]);

  return (
    <InteractiveResponseWrapper>
      <div>Blocks count: {reactBlocks.length}</div>
      <InteractiveResponseBadge
        sx={{ marginTop: "85px", backgroundColor: colors.purple[100] }}
      >
        1
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "100px" }} />
      {reactBlocks.map((block) => (
        <InteractiveResponseBlock
          horizontaloffset={block.horizontalOffset}
          verticaloffset={block.verticalOffset}
          key={generateUniqueID()}
        >
          {block.message.meta.callee}
        </InteractiveResponseBlock>
      ))}

      <InteractiveResponseBadge
        sx={{ marginTop: "185px", backgroundColor: colors.purple[100] }}
      >
        2
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "200px" }} />

      <InteractiveResponseBadge
        sx={{ marginTop: "285px", backgroundColor: colors.purple[100] }}
      >
        3
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "300px" }} />

      <InteractiveResponseBadge
        sx={{ marginTop: "385px", backgroundColor: colors.purple[100] }}
      >
        4
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "400px" }} />

      <InteractiveResponseBadge
        sx={{ marginTop: "485px", backgroundColor: colors.purple[100] }}
      >
        5
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "500px" }} />

      <InteractiveResponseBadge
        sx={{ marginTop: "585px", backgroundColor: colors.purple[100] }}
      >
        6
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "600px" }} />
    </InteractiveResponseWrapper>
  );
}
