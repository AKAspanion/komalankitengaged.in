import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
        <Toaster position="bottom-left" />
        <main className="min-h-screen">
          <div className="navbar bg-base-100">
            <div className="flex-1 pl-3">
              <a href="/">Manage Guests</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a href="/room-layout">Room Layout</a>
                </li>
                <li>
                  <a href="/add-guests">Add Guests</a>
                </li>
                {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
              </ul>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
