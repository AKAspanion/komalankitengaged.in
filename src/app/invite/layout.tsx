import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Komal and Ankit's Engagement",
  description: "Tool to manage our guests and invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-auto" style={{ height: "calc(100svh)" }}>
      {children}
    </div>
  );
}
