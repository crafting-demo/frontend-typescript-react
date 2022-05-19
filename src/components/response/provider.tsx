import { createContext, useMemo, useState } from "react";

import { emptyMessage } from "common/helpers";
import { Message } from "common/types";

export const ResponseContext = createContext<
  [Message, React.Dispatch<React.SetStateAction<Message>>]
>([emptyMessage(), () => undefined]);

interface ResponseProviderParams {
  children: React.ReactNode;
}

export function ResponseProvider({ children }: ResponseProviderParams) {
  const [response, setResponse] = useState(emptyMessage());

  const defaultResponseContext: [
    Message,
    React.Dispatch<React.SetStateAction<Message>>
  ] = useMemo(() => [response, setResponse], [response]);

  return (
    <ResponseContext.Provider value={defaultResponseContext}>
      {children}
    </ResponseContext.Provider>
  );
}
