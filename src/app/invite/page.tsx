"use client";

import localFont from "next/font/local";
import classNames from "classnames";

import Image from "next/legacy/image";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./landing.css";
import Timer from "./timer";

const marley = localFont({
  src: "../../../public/fonts/marley/ttf/marley-marley-regular-lovely-script-400.ttf",
  variable: "--font-marley",
});
const helostar = localFont({
  src: "../../../public/fonts/helostar/ttf/helostar-helostar-400.ttf",
  variable: "--font-helostar",
});

const targetDate = new Date("12.01.2023 21:00").getTime();

function Invite() {
  const [loaded, setLoaded] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const rsvp = searchParams.get("rsvp");

      if (rsvp) {
        setShowRSVP(true);
      }
    }
  }, [searchParams]);

  return (
    <div
      className={classNames("relative bg-slate-50 text-sm text-black h-screen")}
    >
      <div className="absolute hidden sm:block bg-slate-50 top-0 w-screen h-screen">
        <Image
          quality={100}
          alt="bg"
          src="/us.jpeg"
          layout="fill"
          objectFit="cover"
          className={loaded ? "zoom-in" : "not-zoom-in"}
          style={{ filter: "opacity(0.9)" }}
          onLoad={handleOnLoad}
        />
      </div>
      <div className="absolute sm:hidden bg-slate-50 top-0 w-screen h-screen">
        <Image
          quality={100}
          alt="bg"
          src="/us-sm.jpeg"
          layout="fill"
          objectFit="cover"
          className={loaded ? "zoom-in" : "not-zoom-in"}
          style={{ filter: "opacity(0.9)" }}
          onLoad={handleOnLoad}
        />
      </div>
      <div className="z-10 w-screen absolute text-center h-screen flex flex-col items-center justify-between gap-16 p-16">
        <div></div>
        <div className="text-center flex flex-col items-center justify-center">
          <div
            style={{ textShadow: "1px 1px 2px black" }}
            className={classNames(
              "text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl",
              helostar.className
            )}
          >
            <div>Komal & Ankit</div>
          </div>
          <p
            className={classNames(
              "text-2xl md:text-3xl rounded w-fit",
              marley.className
            )}
          >
            are getting engaged!
          </p>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          {showRSVP ? (
            <div className="m-6 tracking-wide font-medium rounded bg-opacity-20 bg-gray-900 p-4">
              <div>Will you be attending?</div>
              <div className="pt-2 flex justify-between">
                <a href={`/invite/rsvp?id=${searchParams?.get("rsvp") || ""}`}>
                  <button className="border-2 border-black px-2 py-1">
                    <div>Yes</div>
                  </button>
                </a>
                <a href={`/invite/rsvp?id=${searchParams?.get("rsvp") || ""}`}>
                  <button className="border-2 border-black px-2 py-1">
                    <div>No</div>
                  </button>
                </a>
              </div>
            </div>
          ) : null}
          <div
            className={classNames(
              "leading-6 tracking-widest px-4 py-1 rounded w-fit"
            )}
          >
            <a href="/invite/details">
              <div className="font-semibold underline underline-offset-4">
                1.10.2023
              </div>
            </a>
          </div>
          <div>
            <Timer targetDate={targetDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Invite />;
}
