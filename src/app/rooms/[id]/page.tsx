"use client";

import Authorized from "@/components/Authorized";
import useRoomDetails from "@/hooks/useRoomDetails";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import ContentLoader from "@/components/ContentLoader";
import RoomCard from "@/components/RoomCard";

function RoomDetails() {
  const params = useParams();

  const id = (params?.["id"] || "").toString();

  const { roomData, roomDataLoading } = useRoomDetails(id);

  return roomDataLoading ? (
    <ContentLoader />
  ) : !roomData ? (
    <div className="w-full p-8 text-center">No data available</div>
  ) : (
    <div>
      <div className="px-4">
        <h2 className="pt-4 pb-2 text-md font-semibold">Room Details</h2>
        <div className="max-w-md">
          <RoomCard room={roomData} />
        </div>
        <h2 className="pt-4 pb-2 text-md font-semibold">Guests in room</h2>
      </div>
      {roomData?.guests?.length <= 0 ? (
        <div className="w-full p-8 text-center">No data available</div>
      ) : (
        <table className="table table-zebra border-t-[0.5px] border-gray-800">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {roomData?.guests.map((guest, index) => {
              return (
                <tr key={guest._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{guest.name}</td>
                  <td>{guest.phoneNo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Authorized>
      <RoomDetails />
    </Authorized>
  );
}
