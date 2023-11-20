import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserBadge from "@/components/UserBadge";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Manage Guests",
  description: "Tool to manage our guests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="navbar">
        <div className="flex-1 flex">
          <a
            href="/manage/guest"
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <BriefcaseIcon className="w-5 h-5" />
          </a>
        </div>
        <div className="flex-none hidden md:block">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/manage/guest">Guests</a>
            </li>
            <li>
              <a href="/manage/rooms">Rooms</a>
            </li>
            <li>
              <a href="/manage/guest-form">Add Guest</a>
            </li>
            <li className="mr-1">
              <UserBadge />
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Bars3BottomRightIcon className="w-5 h-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box max-w-md"
          >
            <li className="mr-1">
              <UserBadge />
            </li>
            <li>
              <a href="/manage/guest">Guests</a>
            </li>
            <li>
              <a href="/manage/rooms">Rooms</a>
            </li>
            <li>
              <a href="/manage/guest-form">Add Guest</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100svh - 68px)" }}
      >
        {children}
      </div>
    </div>
  );
}
