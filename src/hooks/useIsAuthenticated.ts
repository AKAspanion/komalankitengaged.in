import { useUserStore } from "@/store/user";
import { FC } from "react";

const useIsAuthenticated = () => {
  const token = useUserStore((s) => s.token);

  return !!token;
};

export default useIsAuthenticated;
