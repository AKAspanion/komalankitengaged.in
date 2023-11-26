"use client";

import Authorized from "@/components/Authorized";
import useRoomDetails from "@/hooks/useRoomDetails";
import React, { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ContentLoader from "@/components/ContentLoader";
import RoomCard from "@/components/RoomCard";
import classNames from "classnames";
import NoContent from "@/components/NoContent";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import TitleBox from "@/components/TitleBox";
import Hydrated from "@/components/Hydrated";
import useRoomDetailsByKey from "@/hooks/useRoomDetailsByKey";

function RoomDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isAuth = useIsAuthenticated();

  const id = (params?.["id"] || "").toString();

  const { roomDataById, roomDataLoadingById } = useRoomDetails(id);
  const { roomDataByKey, roomDataLoadingByKey } = useRoomDetailsByKey(
    searchParams?.get("key") || ""
  );

  const roomData = useMemo(
    () => roomDataById || roomDataByKey,
    [roomDataById, roomDataByKey]
  );
  const roomDataLoading = useMemo(
    () => roomDataLoadingById || roomDataLoadingByKey,
    [roomDataLoadingById, roomDataLoadingByKey]
  );

  return roomDataLoading ? (
    <ContentLoader />
  ) : !roomData ? (
    <NoContent />
  ) : (
    <div>
      <div className="px-4">
        <div className="pb-1">
          <TitleBox
            title="Room Details"
            back={isAuth ? "/manage/rooms" : undefined}
          />
        </div>
        <div className="max-w-md">
          <RoomCard room={roomData} inPage />
        </div>
        <div className="pb-1 mt-4">
          <TitleBox title="Guests" subtitle="Guests in this room" />
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
            </tr>
          </thead>
          <tbody>
            {roomData?.guests.map((guest, index) => {
              return (
                <tr key={guest?._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{guest?.name || "-"}</td>
                  <td>{guest?.phoneNo || "-"}</td>
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
    <Hydrated>
      <RoomDetails />
    </Hydrated>
  );
}
