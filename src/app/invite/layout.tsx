import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Komal and Ankit's Engagement",
  description: "Komal and Ankit are getting engaged on 01.12.2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-y-auto relative bg-slate-50  text-black"
      style={{ height: "calc(100svh)" }}
    >
      {children}
    </div>
  );
}
