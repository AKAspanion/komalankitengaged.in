import { User } from "@/schema/user";
import axios from "axios";
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
            const { data } = await axios.post<
              AppAPIRespose<{ user: User; token: string }>
            >("/api/login", {
              email,
              password,
            });
            console.log(data);
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

type UserStore = {
  user?: User;
  token?: string;
  loginLoading?: boolean;
  logoutUser: () => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
};
