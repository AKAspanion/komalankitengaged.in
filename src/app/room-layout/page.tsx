"use client";

import Hydrated from "@/components/Hydrated";
import { useGuestStore } from "@/store/store";

// 01

function RoomLayout() {
  const rooms = useGuestStore((state) => state.totalRooms);

  return <div className="p-4">Room Layout</div>;
}

export default function Page() {
  return (
    <Hydrated>
      <RoomLayout />
    </Hydrated>
  );
}
