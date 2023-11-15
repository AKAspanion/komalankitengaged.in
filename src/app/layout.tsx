import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserBadge from "@/components/UserBadge";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manage Guests",
  description: "To manage my guests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="bottom-left"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#1D232A",
              color: "#fff",
              border: "0.5px solid #383F47",
            },
          }}
        />
        <main className="h-screen">
          <div className="navbar">
            <div className="flex-1 flex">
              <a href="/" tabIndex={0} className="btn btn-ghost btn-circle">
                <BriefcaseIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="flex-none hidden md:block">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a href="/home">Guests</a>
                </li>
                <li>
                  <a href="/rooms">Rooms</a>
                </li>
                <li>
                  <a href="/guest-form">Add Guest</a>
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
                  <a href="/home">Guests</a>
                </li>
                <li>
                  <a href="/rooms">Rooms</a>
                </li>
                <li>
                  <a href="/guest-form">Add Guest</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="overflow-y-auto"
            style={{ height: "calc(100vh - 68px)" }}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
