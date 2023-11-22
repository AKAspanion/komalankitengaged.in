/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";

import { FC } from "react";

interface FlowerBackgroundProps {
  children: React.ReactNode;
}

const FlowerBackground: FC<FlowerBackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-screen h-[100svh] bg-white text-black text-xs">
      <div className="absolute z-20 w-screen h-[100svh] flex items-center justify-center uppercase text-center">
        {children}
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[50vw] h-[50svh] relative">
          <div className="absolute top-0 left-0 z-10">
            <img className="scale-y-[-1]" alt="bg" src={"/frame-bg.webp"} />
          </div>
        </div>
        <div className="w-[50vw] h-[50svh] relative">
          <div className="absolute top-0 right-0">
            <img className="scale-x-[-1]" alt="frame" src={"/frame.webp"} />
          </div>
        </div>
        <div className="w-[50vw] h-[50svh] relative">
          <div className="absolute bottom-0 left-0">
            <img className="scale-y-[-1]" alt="frame" src={"/frame.webp"} />
          </div>
        </div>
        <div className="w-[50vw] h-[50svh] relative">
          <div className="absolute bottom-0 right-0 z-10">
            <img className="scale-x-[-1]" alt="bg" src={"/frame-bg.webp"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerBackground;
