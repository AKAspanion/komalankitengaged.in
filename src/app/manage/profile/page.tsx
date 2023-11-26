"use client";

import Authorized from "@/components/Authorized";
import TitleBox from "@/components/TitleBox";
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
      <TitleBox title="Profile" back={token ? "/manage" : undefined} />
      <div className="p-6">{user?.email || "-"}</div>
      {token ? (
        <div>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
