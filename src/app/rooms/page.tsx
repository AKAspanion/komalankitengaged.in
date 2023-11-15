"use client";

import Hydrated from "@/components/Hydrated";
import { useGuestStore } from "@/store/store";

// 01

function Rooms() {
  const rooms = useGuestStore((state) => state.totalRooms);

  return <div className="p-4">Rooms</div>;
}

export default function Page() {
  return (
    <Hydrated>
      <Rooms />
    </Hydrated>
  );
}
