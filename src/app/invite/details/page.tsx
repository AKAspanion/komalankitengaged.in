/* eslint-disable @next/next/no-img-element */
"use client";

import FlowerBackground from "@/components/FlowerBackground";
import { getIdFromUrlAndLocalStorage } from "@/utils/validate";
import classNames from "classnames";
import localFont from "next/font/local";
import { useSearchParams } from "next/navigation";

const helostar = localFont({
  src: "../../../../public/fonts/helostar/ttf/helostar-helostar-400.ttf",
  variable: "--font-helostar",
});

function Details() {
  const searchParams = useSearchParams();

  const urlId = getIdFromUrlAndLocalStorage(searchParams);

  return (
    <FlowerBackground>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-1 font-light text-[12px]">
          <div>please join us for</div>
          <div>the engagement cermony of </div>
        </div>
        <div
          className={classNames(
            "text-4xl md:text-5xl flex flex-col gap-4",
            helostar.className
          )}
        >
          <div className="pl-6">Komal</div>
          <div className={classNames("text-4xl")}>&</div>
          <div>Ankit</div>
        </div>

        <div className="flex flex-col gap-1 font-light text-[12px]">
          <div>Friday, 1st December, 7&apos; clock</div>
          <a
            className="underline underline-offset-4"
            href="https://maps.app.goo.gl/W9ueH5wxMzU8mM2a6"
            target="_blank"
          >
            <div>JALSAGHAR, SHAKUNTALA PARK, KOLKATA </div>
          </a>
          <div className="underline underline-offset-4 pt-8">
            {/* <a href={`/invite/rsvp?id=${urlId}`}>RSVP</a> */}
            <a href={`/invite/rsvp?id=${urlId}`}>
              <button className="border border-black px-2 py-1">
                <div>RSVP</div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </FlowerBackground>
  );
}

export default function Page() {
  return <Details />;
}
