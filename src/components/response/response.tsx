import { Message } from "common/types";
import { ResponseWrapper } from "components/common";
import { CurrentTimeline } from "components/response/current";
import { HistoryTimeline } from "components/response/history";

interface ResponseParams {
  message?: Message;
}

export function Response(params: ResponseParams) {
  const { message } = params;

  return (
    <ResponseWrapper>
      <CurrentTimeline message={message} />
      <HistoryTimeline />
    </ResponseWrapper>
  );
}
