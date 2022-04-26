import { Message } from "common/types";
import {
  InteractiveResponseBadge,
  InteractiveResponseLine,
  InteractiveResponseWrapper,
} from "components/common";
import { colors } from "styles/palette";

export interface MessageBlock {
  message: Message;
  type: string; // request | response
  horizontalOffset: number;
  verticalOffset: number;
}

export function ResponseBuilderInteractive() {
  return (
    <InteractiveResponseWrapper>
      <InteractiveResponseBadge
        sx={{ marginTop: "85px", backgroundColor: colors.purple[100] }}
      >
        1
      </InteractiveResponseBadge>
      <InteractiveResponseLine sx={{ marginTop: "100px" }} />

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
