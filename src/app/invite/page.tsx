"use client";

import localFont from "@next/font/local";
import classNames from "classnames";

import Image from "next/image";

import "./landing.css";
import { useState } from "react";

const marley = localFont({
  src: "../../../public/fonts/marley/ttf/marley-marley-regular-lovely-script-400.ttf",
  variable: "--font-marley",
});
const helostar = localFont({
  src: "../../../public/fonts/helostar/ttf/helostar-helostar-400.ttf",
  variable: "--font-helostar",
});

function Invite() {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };
  return (
    <div className={classNames("relative bg-slate-50 text-sm text-black")}>
      <div className="absolute bg-slate-50 top-0 w-screen h-screen">
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

      <div className="z-10 w-screen absolute text-center h-screen flex flex-col items-center justify-between gap-16 p-8">
        <div className="">
          {/* <div>JOIN US FOR</div>
          <div>OUR ENGAGEMENT CELEBRARTION</div> */}
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <p
            className={classNames(
              "text-2xl p-5 rounded w-fit",
              marley.className
            )}
          >
            Celebrating the Enaggement of
          </p>
          <div
            // style={{ textShadow: "1px 1px 4px black" }}
            style={{ textShadow: "0.5px 0.5px 2px black" }}
            className={classNames(
              "text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl",
              helostar.className
            )}
          >
            <div>Komal & Ankit</div>
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          {/* <div className={classNames("p-4 text-2xl", mantulPro.className)}>
            We are getting engaged!
          </div> */}
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
            {/* <div>December 1st, 2023</div> */}
            {/* <div className="divider" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Invite />;
}
