"use client";
import { useEffect, useState } from "react";

const Hydrated = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <div>{children}</div>
      ) : (
        <div className="w-full h-full flex items-center justify-center min-h-[420px]">
          <div className="loading loading-ring loading-lg"></div>
        </div>
      )}
    </>
  );
};

export default Hydrated;
