"use client";

import Authorized from "@/components/Authorized";
import useRoomDetails from "@/hooks/useRoomDetails";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

function RoomDetails() {
  const params = useParams();

  const id = (params?.["id"] || "").toString();

  const {} = useRoomDetails(id);

  return <div className="p-4">RoomDetails</div>;
}

export default function Page() {
  return (
    <Authorized>
      <RoomDetails />
    </Authorized>
  );
}
