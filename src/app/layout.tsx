import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
          <div className="overflow-y-auto" style={{ height: "calc(100svh)" }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
