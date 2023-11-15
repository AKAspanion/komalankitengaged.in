"use client";

import Hydrated from "@/components/Hydrated";
import { UserLoginSchema } from "@/schema/user";
import { useUserStore } from "@/store/user";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();
  const loading = useUserStore((state) => state.loginLoading);
  const loginUser = useUserStore((state) => state.loginUser);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const email = (formData.get("email") || "")?.toString();
      const password = (formData.get("password") || "")?.toString();

      UserLoginSchema.parse({ email, password });

      const success = await loginUser(email, password);

      if (success) {
        toast.success("Logged in succesfully");
        router.push("/home");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="p-4 text-center flex items-center justify-center w-full h-full">
      <form className="flex flex-col gap-4 w-[360px]" onSubmit={onSubmit}>
        <h2 className="font-semibold text-xl pb-1">Login</h2>
        <div className="form-control">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="input input-bordered"
          />
        </div>
        <button disabled={loading} className="btn btn-primary w-full">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
        <div className="pb-16"></div>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated>
      <Login />
    </Hydrated>
  );
}
