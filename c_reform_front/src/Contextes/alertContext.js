import { createContext, useContext } from "react";

export const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}
