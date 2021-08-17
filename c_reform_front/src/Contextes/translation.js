import { createContext, useContext } from "react";

export const TransContext = createContext();

export function useTrans() {
  return useContext(TransContext);
}
