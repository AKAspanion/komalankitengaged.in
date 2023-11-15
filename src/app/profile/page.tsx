"use client";

import Authorized from "@/components/Authorized";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const logoutUser = useUserStore((state) => state.logoutUser);

  const handleLogout = async () => {
    await logoutUser();

    router.push("/login");
  };

  return (
    <div className="p-4 text-center">
      <div className="pb-6">{user?.email || "-"}</div>
      {token ? (
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <a href="/login">
          <button className="btn">Login</button>
        </a>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Authorized>
      <Profile />
    </Authorized>
  );
}
