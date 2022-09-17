import React, { useContext, useState } from "react";

type WbsContextProps = {
  depthScale: number;
  setDepthScale: (scale: number) => void;
};

const defaultSettings: WbsContextProps = {
  depthScale: 1,
  setDepthScale: () => {},
};

export const WbsContext = React.createContext<WbsContextProps>(defaultSettings);

const WbsProvider = ({ children }: { children: any }) => {
  const [depthScale, setDepthScale] = useState(defaultSettings?.depthScale);

  return (
    <WbsContext.Provider value={{ depthScale, setDepthScale }}>
      {children}
    </WbsContext.Provider>
  );
};

export function useWbsContext() {
  return useContext(WbsContext);
}

export default WbsProvider;
