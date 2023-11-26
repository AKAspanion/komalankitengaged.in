"use client";

import Authorized from "@/components/Authorized";
import { useGuestStore } from "@/store/guest";
import RoomCard from "@/components/RoomCard";
import useRooms from "@/hooks/useRooms";
import ContentLoader from "@/components/ContentLoader";
import React from "react";
import NoContent from "@/components/NoContent";
import TitleBox from "@/components/TitleBox";

function Rooms() {
  const { rooms, hotelRooms, homeRooms, loading } = useRooms();

  return loading ? (
    <ContentLoader />
  ) : rooms?.length <= 0 ? (
    <NoContent />
  ) : (
    <div className="px-4 pb-4 flex flex-col gap-4">
      <div>
        <TitleBox title="Rooms" subtitle="List of available rooms" />
      </div>
      {hotelRooms?.length > 0 ? (
        <React.Fragment>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {hotelRooms.map((r) => (
              <a key={r._id} href={`/manage/rooms/${r?._id || ""}/`}>
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
              <a key={r._id} href={`/manage/rooms/${r?._id || ""}/`}>
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
