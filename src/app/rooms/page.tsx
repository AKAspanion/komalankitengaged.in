"use client";

import Authorized from "@/components/Authorized";
import { useGuestStore } from "@/store/guest";
import RoomCard from "@/components/RoomCard";
import useRooms from "@/hooks/useRooms";
import ContentLoader from "@/components/ContentLoader";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Rooms() {
  const searchParams = useSearchParams();

  const { rooms, hotelRooms, homeRooms, loading } = useRooms();

  return loading ? (
    <ContentLoader />
  ) : rooms?.length <= 0 ? (
    <div className="w-full p-8 text-center">No data available</div>
  ) : (
    <div className="px-4 pb-4 flex flex-col gap-4">
      <div>
        <h1 className="font-medium text-xl pl-1 pb-1">Rooms</h1>
        <div className="text-sm text-gray-400 pl-1">
          List of available rooms
        </div>
      </div>
      {hotelRooms?.length > 0 ? (
        <React.Fragment>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6  gap-4">
            {hotelRooms.map((r) => (
              <a key={r._id} href={`/rooms/${r?._id || ""}/`}>
                <RoomCard room={r} />
              </a>
            ))}
          </div>
        </React.Fragment>
      ) : null}
      {homeRooms?.length > 0 ? (
        <React.Fragment>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {homeRooms.map((r) => (
              <a key={r._id} href={`/rooms/${r?._id || ""}/`}>
                <RoomCard room={r} />
              </a>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default function Page() {
  return (
    <Authorized>
      <Rooms />
    </Authorized>
  );
}
