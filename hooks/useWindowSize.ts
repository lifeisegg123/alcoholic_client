import { useEffect, useState } from "react";

type ReturnType = [{ width?: number; height?: number }, boolean];

export const useWindowSize = (): ReturnType => {
  const isClient = typeof window === "object";

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize());
  const [isMobile, setIsMobile] = useState(getSize().width! < 768);

  useEffect(() => {
    if (isClient) {
      const handleResize = () => {
        const size = getSize();
        setWindowSize(size);
        setIsMobile(size.width! < 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return [windowSize, isMobile];
};
