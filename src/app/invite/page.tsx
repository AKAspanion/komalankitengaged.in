"use client";

import localFont from "next/font/local";
import classNames from "classnames";

import Image from "next/legacy/image";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./landing.css";
import Timer from "./timer";
import Hydrated from "@/components/Hydrated";
import axiosInstance from "@/lib/axios";
import { RSVPType } from "@/schema/guest";
import { getIdFromUrlAndLocalStorage } from "@/utils/validate";

const marley = localFont({
  src: "../../../public/fonts/marley/ttf/marley-marley-regular-lovely-script-400.ttf",
  variable: "--font-marley",
});
const helostar = localFont({
  src: "../../../public/fonts/helostar/ttf/helostar-helostar-400.ttf",
  variable: "--font-helostar",
});

const currentDate = new Date().getTime();
const targetDate = new Date("12.01.2023 19:00").getTime();

function Invite() {
  const [datePassed] = useState(targetDate < currentDate);
  const [loaded, setLoaded] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  const handleRSVPCheck = async (id: string) => {
    try {
      if (id) {
        const { data } = await axiosInstance.get<AppAPIRespose<RSVPType>>(
          `/api/guest/${id}/rsvp`
        );
        if (data?.data === undefined) {
          setShowRSVP(true);
        }
      }
    } catch (error) {}
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const rsvp = getIdFromUrlAndLocalStorage(searchParams);

      if (rsvp) {
        handleRSVPCheck(rsvp);
      }
    }
  }, [searchParams]);

  const urlId = getIdFromUrlAndLocalStorage(searchParams);

  return (
    <div
      className={classNames(
        "relative bg-slate-50 text-sm text-black h-[100svh]"
      )}
    >
      {datePassed ? null : (
        <div className="absolute font-light text-[10px] md:text-[12px] flex justify-between w-screen uppercase z-20 p-6 md:p-12">
          <a href={`/invite/details?id=${urlId}`}>
            <div className="underline underline-offset-4">Where</div>
          </a>
          <div className="underline underline-offset-4">
            <a href={`/invite/rsvp?id=${urlId}`}>RSVP</a>
          </div>
        </div>
      )}
      <div className="absolute hidden sm:block bg-slate-50 top-0 w-screen h-[100svh]">
        <Image
          quality={100}
          alt="bg"
          src="/us.webp"
          layout="fill"
          objectFit="cover"
          className={loaded ? "zoom-in" : "not-zoom-in"}
          style={{ filter: "opacity(0.7)" }}
          onLoad={handleOnLoad}
        />
      </div>
      <div className="absolute sm:hidden bg-slate-50 top-0 w-screen h-[100svh]">
        <Image
          quality={100}
          alt="bg"
          src="/us-sm.webp"
          layout="fill"
          objectFit="cover"
          className={loaded ? "zoom-in" : "not-zoom-in"}
          style={{ filter: "opacity(0.9)" }}
          onLoad={handleOnLoad}
        />
      </div>
      <div className="z-10 w-screen absolute text-center h-[100svh] flex flex-col items-center justify-between gap-16 p-16">
        <div></div>
        <div className="text-center flex flex-col items-center justify-center">
          <div
            style={{ textShadow: "0.5px 0.5px 2px black" }}
            className={classNames(
              "text-7xl md:text-8xl drop-shadow-xl",
              helostar.className
            )}
          >
            <div>Komal & Ankit</div>
          </div>
          <p
            className={classNames(
              "text-4xl md:text-5xl rounded w-fit",
              marley.className
            )}
          >
            {datePassed ? "got" : "are getting"} engaged!
          </p>
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          {!datePassed && showRSVP ? (
            <div className="m-4 tracking-wide font-medium rounded bg-opacity-60 text-white bg-gray-900 p-3 text-[12px]">
              <div>Are you attending?</div>
              <div className="pt-2 flex justify-center">
                <a href={`/invite/rsvp?id=${urlId}`}>
                  <button className="border border-white px-2">
                    <div>RSVP</div>
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
            <a href={datePassed ? undefined : `/invite/details?id=${urlId}`}>
              <div className="font-semibold uppercase underline underline-offset-8 text-[12px]">
                01.12.2023
              </div>
              <div className="font-semibold text-[8px] uppercase">
                Jalsaghar, Shakuntala Park, Kolkata
              </div>
            </a>
          </div>
          <div>{datePassed ? null : <HydratedTimer />}</div>
        </div>
      </div>
    </div>
  );
}

function HydratedTimer() {
  return (
    <Hydrated loader={false}>
      <Timer targetDate={targetDate} />
    </Hydrated>
  );
}

export default function Page() {
  return <Invite />;
}
