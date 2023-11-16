"use client";

import Authorized from "@/components/Authorized";
import ContentLoader from "@/components/ContentLoader";
import Hydrated from "@/components/Hydrated";
import NoContent from "@/components/NoContent";
import useGuests from "@/hooks/useGuests";
import useRooms from "@/hooks/useRooms";
import { CompleteGuest, Guest } from "@/schema/guest";
import { Room } from "@/schema/room";
import { useGuestStore } from "@/store/guest";
import { HomeIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useState } from "react";

function Home() {
  const { guests, loading } = useGuests();

  return loading ? (
    <ContentLoader />
  ) : guests?.length <= 0 ? (
    <NoContent />
  ) : (
    <div className="">
      <div className="px-3">
        <h1 className="font-medium text-xl pl-1 pb-1">Guests</h1>
        <div className="text-sm text-gray-400 pl-1 pb-4">
          List of available guests
        </div>
      </div>
      <div className="overflow-x-auto border-t-[0.5px] border-gray-800">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone No</th>
              <th>Guest Side</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => {
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
                  <td>
                    <a
                      className="hover:underline underline-offset-4"
                      href={`/rooms/${guest.room || ""}`}
                    >
                      {guest?.roomData?.type} - {guest?.roomData?.name}
                    </a>
                  </td>
                  <td>
                    <GuestActions guest={guest} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const RoomModal = ({
  id,
  onUpdate,
}: {
  onUpdate: (r: Room) => void;
  id: string;
}) => {
  const { rooms, loading: roomLoading } = useRooms();

  const [roomId, setRoomId] = useState<string | undefined>();

  const handleSubmit = () => {
    const room = rooms.find((r) => r._id === roomId);

    if (room) {
      onUpdate(room);
    }
  };

  return (
    <>
      <label htmlFor={id}>
        <HomeIcon className="w-4 h-4 cursor-pointer" />
      </label>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="">
            <h1 className="font-medium text-xl pl-1 pb-1">Update</h1>
            <div className="text-sm text-gray-400 pl-1 pb-4">
              Update room for guest
            </div>
          </div>
          {roomLoading ? (
            <div className="loading loading-spinner loading-sm"></div>
          ) : (
            <select
              className="select select-bordered w-full min-w-[80px]"
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option disabled selected>
                Select Room
              </option>
              {rooms.map((r) => {
                return (
                  <option key={r._id} value={r._id}>
                    {r.type} - {r.name}
                  </option>
                );
              })}
            </select>
          )}
          <div className="modal-action flex gap-4 justify-between">
            <label htmlFor={id} className="btn">
              Close
            </label>
            <button
              disabled={!roomId}
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const GuestActions = ({ guest }: { guest: CompleteGuest }) => {
  const removeGuest = useGuestStore((s) => s.removeGuest);
  const updateGuestRoom = useGuestStore((s) => s.updateGuestRoom);
  const removeGuestLoading = useGuestStore((s) => s.removeGuestLoading);
  const updateGuestRoomLoading = useGuestStore((s) => s.updateGuestRoomLoading);

  return (
    <div className="flex items-center justify-center w-8 gap-2">
      {updateGuestRoomLoading[guest._id] ? (
        <div className="loading loading-spinner h-4"></div>
      ) : (
        <RoomModal
          key={guest._id}
          id={guest._id}
          onUpdate={(r) => updateGuestRoom(guest._id, r, guest?.room)}
        />
      )}
      {removeGuestLoading[guest._id] ? (
        <div className="loading loading-spinner h-4"></div>
      ) : (
        <button onClick={() => removeGuest(guest._id, guest.room)}>
          <TrashIcon className="h-4 w-4 text-error" />
        </button>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <Hydrated>
      <Authorized>
        <Home />
      </Authorized>
    </Hydrated>
  );
}
