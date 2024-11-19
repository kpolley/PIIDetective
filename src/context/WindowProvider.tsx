"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WindowContextProps {
  width: number;
  height: number;
  isMobile: boolean;
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined);

const WindowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windowSize, setWindowSize] = useState<WindowContextProps>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 768,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowContext.Provider value={windowSize}>
      {children}
    </WindowContext.Provider>
  );
};

const useWindow = (): WindowContextProps => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error("useWindow must be used within a WindowProvider");
  }
  return context;
};

export { WindowProvider, useWindow };
