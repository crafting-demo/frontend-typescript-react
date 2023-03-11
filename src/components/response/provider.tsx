import { createContext, useMemo, useState } from "react";

import { ResponseMessage } from "common/types";

function emptyMessage() {
  const message: ResponseMessage = {
    receivedTime: "",
    returnTime: "",
    message: "",
  };
  return message;
}

export const ResponseContext = createContext<
  [ResponseMessage, React.Dispatch<React.SetStateAction<ResponseMessage>>]
>([emptyMessage(), () => undefined]);

interface ResponseProviderParams {
  children: React.ReactNode;
}

export function ResponseProvider({ children }: ResponseProviderParams) {
  const [response, setResponse] = useState(emptyMessage());

  const defaultResponseContext: [
    ResponseMessage,
    React.Dispatch<React.SetStateAction<ResponseMessage>>
  ] = useMemo(() => [response, setResponse], [response]);

  return (
    <ResponseContext.Provider value={defaultResponseContext}>
      {children}
    </ResponseContext.Provider>
  );
}
