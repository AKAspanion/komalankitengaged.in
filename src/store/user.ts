import axiosInstance from "@/lib/axios";
import { User } from "@/schema/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: undefined,
      token: undefined,
      loginLoading: false,
      logoutUser: async () => {
        set(() => ({
          loginLoading: false,
          user: undefined,
          token: undefined,
        }));
        return true;
      },
      loginUser: async (email: string, password: string) => {
        try {
          const loading = get().loginLoading;
          if (!loading) {
            set(() => ({ loginLoading: true }));
            const { data } = await axiosInstance.post<
              AppAPIRespose<{ user: User; token: string }>
            >("/api/login", {
              email,
              password,
            });
            set(() => ({
              loginLoading: false,
              user: data?.data?.user,
              token: data?.data?.token,
            }));

            return true;
          }

          return false;
        } catch (error) {
          set(() => ({ loginLoading: false }));
          return false;
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export type UserStore = {
  user?: User;
  token?: string;
  loginLoading?: boolean;
  logoutUser: () => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
};
