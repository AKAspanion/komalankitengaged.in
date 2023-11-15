"use client";

import { FC } from "react";
import Hydrated from "./Hydrated";
import { useUserStore } from "@/store/user";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface UserBadgeProps {}

const HyderatedUserBadge: FC<UserBadgeProps> = ({}) => {
  const user = useUserStore((s) => s.user);

  return (
    <div className="flex gap-2">
      {user?.email ? (
        <a href="/profile">
          <div className="text-sm text-gray-400">{user?.email || ""}</div>
        </a>
      ) : (
        <a href="/login">Login</a>
      )}
      <UserCircleIcon className="w-5 h-5" />
    </div>
  );
};

const UserBadge: FC<UserBadgeProps> = (props) => {
  return (
    <Hydrated loader={false}>
      <HyderatedUserBadge {...props} />
    </Hydrated>
  );
};

export default UserBadge;
