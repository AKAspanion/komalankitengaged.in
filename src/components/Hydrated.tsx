"use client";
import { useEffect, useState } from "react";
import ContentLoader from "./ContentLoader";

import { FC } from "react";

interface HydratedProps {
  loader?: boolean;
  children: React.ReactNode;
}

const Hydrated: FC<HydratedProps> = ({ children, loader = true }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? <>{children}</> : loader ? <ContentLoader /> : null}
    </>
  );
};

export default Hydrated;
