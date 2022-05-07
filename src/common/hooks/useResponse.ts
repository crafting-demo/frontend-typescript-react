import { useContext } from "react";

import { Message } from "common/types";
import { ResponseContext } from "components/response";

export const useResponse = () =>
  useContext<[Message, React.Dispatch<React.SetStateAction<Message>>]>(
    ResponseContext
  );
