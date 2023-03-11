import { useContext } from "react";

import { ResponseMessage } from "common/types";
import { ResponseContext } from "components/response/provider";

export const useResponse = () =>
  useContext<
    [ResponseMessage, React.Dispatch<React.SetStateAction<ResponseMessage>>]
  >(ResponseContext);
