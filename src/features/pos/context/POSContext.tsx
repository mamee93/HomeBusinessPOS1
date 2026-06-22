import React, {
  createContext,
  ReactNode,
  useContext,
} from "react";

 import usePOS from "../hooks/usePOS";
 

type POSContextType = ReturnType<
  typeof usePOS
>;

const POSContext = createContext<
  POSContextType | undefined
>(undefined);

interface POSProviderProps {
  children: ReactNode;
}

export function POSProvider({
  children,
}: POSProviderProps) {
  const pos = usePOS();

  return (
    <POSContext.Provider value={pos}>
      {children}
    </POSContext.Provider>
  );
}

export function usePOSContext() {
  const context = useContext(POSContext);

  if (!context) {
    throw new Error(
      "usePOSContext must be used inside POSProvider"
    );
  }

  return context;
}