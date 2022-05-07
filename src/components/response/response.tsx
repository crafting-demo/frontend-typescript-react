import ReactJson from "react-json-view";

import { useResponse } from "common/hooks";

export function ResponseBuilder() {
  const [response] = useResponse();

  return <ReactJson name="response" src={response} displayDataTypes={false} />;
}
