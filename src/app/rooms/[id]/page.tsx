"use client";

import Authorized from "@/components/Authorized";
import useRoomDetails from "@/hooks/useRoomDetails";
import React from "react";
import { useParams } from "next/navigation";
import ContentLoader from "@/components/ContentLoader";
import RoomCard from "@/components/RoomCard";
import classNames from "classnames";
import NoContent from "@/components/NoContent";

function RoomDetails() {
  const params = useParams();

  const id = (params?.["id"] || "").toString();

  const { roomData, roomDataLoading } = useRoomDetails(id);

  return roomDataLoading ? (
    <ContentLoader />
  ) : !roomData ? (
    <NoContent />
  ) : (
    <div>
      <div className="px-4">
        <div className="pb-1">
          <h1 className="font-medium text-xl pl-1 pb-1">Room Details</h1>
        </div>
        <div className="max-w-md">
          <RoomCard room={roomData} />
        </div>
        <div className="pb-1 mt-4">
          <h1 className="font-medium text-xl pl-1 pb-1">Guests</h1>
          <div className="text-sm text-gray-400 pl-1 pb-4">
            List of guests in this room
          </div>
        </div>
      </div>
      {roomData?.guests?.length <= 0 ? (
        <NoContent />
      ) : (
        <table className="table table-zebra border-t-[0.5px] border-gray-800">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone No</th>
              <th>Guest Side</th>
            </tr>
          </thead>
          <tbody>
            {roomData?.guests.map((guest, index) => {
              return (
                <tr key={guest._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{guest.name || "-"}</td>
                  <td>{guest.phoneNo || "-"}</td>
                  <td>
                    <div
                      className={classNames(
                        "badge",
                        { "badge-secondary": guest.side === "Komal" },
                        { "badge-accent": guest.side === "Ankit" }
                      )}
                    >
                      {guest.side || "-"}
                    </div>
                  </td>
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
