"use client";

import { ArrowRightIcon } from "@heroicons/react/20/solid";

function Home() {
  return (
    <div className="container mx-auto h-full flex items-center justify-center">
      <div className="mb-36 px-4 flex flex-col items-center gap-8 text-center">
        <h1 className="max-w-xl animate-text font-extrabold leading-[64px] text-transparent text-5xl bg-clip-text bg-gradient-to-r from-primary to-secondary">
          {`A tool to manage our guests' accomodation`}
        </h1>
        <h2 className="px-4 font-light">
          With this, we plan all the accomodation for our guests in advance to
          avoid all the hassle and fuss
        </h2>
        <a href="/manage/guest">
          <button className="btn btn-primary flex gap-1 w-fit">
            <div>GET STARTED</div>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  return <Home />;
}
