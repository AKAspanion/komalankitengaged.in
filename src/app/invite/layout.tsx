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
      <div className="absolute font-light text-[10px] md:text-[12px] flex justify-between w-screen uppercase z-20 p-6 md:p-12">
        <a href="/invite/details">
          <div className="underline underline-offset-4">Details</div>
        </a>
        <div className="underline underline-offset-4">
          <a href="/invite/rsvp">Are you coming?</a>
        </div>
      </div>
      {children}
    </div>
  );
}
