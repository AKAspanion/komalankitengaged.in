"use client";
import { useEffect, useState } from "react";
import ContentLoader from "./ContentLoader";

const Hydrated = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : <ContentLoader />}</>;
};

export default Hydrated;
