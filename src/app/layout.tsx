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
        <main className="min-h-screen">
          <div className="navbar bg-base-100">
            <div className="flex-1 pl-3 text-lg font-bold">
              <a href="/">Manage Guests</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a href="/rooms">Rooms</a>
                </li>
                <li>
                  <a href="/add-guests">Add Guests</a>
                </li>
              </ul>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
