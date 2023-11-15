"use client";

import Authorized from "@/components/Authorized";
import Hydrated from "@/components/Hydrated";
import { useGuestStore } from "@/store/guest";


function Rooms() {
  const rooms = useGuestStore((state) => state.totalRooms);

  return <div className="p-4">Rooms</div>;
}

export default function Page() {
  return (
    <Authorized>
      <Rooms />
    </Authorized>
  );
}
