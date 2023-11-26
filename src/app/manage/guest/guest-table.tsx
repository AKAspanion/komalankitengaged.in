import { CompleteGuest, GuestSide } from "@/schema/guest";
import classNames from "classnames";
import { FC, useMemo } from "react";
import useRooms from "@/hooks/useRooms";
import { Room } from "@/schema/room";
import { useGuestStore } from "@/store/guest";
import { HomeIcon } from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import toast from "react-hot-toast";
interface Props {
  guests: CompleteGuest[];
  rsvp?: boolean;
}

const GuestTable: FC<Props> = ({ guests: propGuests, rsvp }) => {
  const [filter, setFilter] = useState("");
  const [guestSide, setGuestSide] = useState<GuestSide>();

  const guests = useMemo(() => {
    return propGuests.filter((i) => {
      const isGuestType = guestSide ? i?.side === guestSide : true;
      const isName = i?.name?.toLowerCase().includes(filter.toLowerCase());

      return isGuestType && isName;
    });
  }, [filter, guestSide, propGuests]);

  const toggleGuestSide = (newSide: GuestSide) => {
    if (guestSide === newSide) {
      setGuestSide(undefined);
    } else {
      setGuestSide(newSide);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-end items-center gap-4">
        <div
          className={classNames("badge badge-secondary cursor-pointer", {
            "badge-outline": guestSide !== "Komal",
          })}
          onClick={() => toggleGuestSide("Komal")}
        >
          Komal
        </div>
        <div
          className={classNames("badge badge-accent cursor-pointer", {
            "badge-outline": guestSide !== "Ankit",
          })}
          onClick={() => toggleGuestSide("Ankit")}
        >
          Ankit
        </div>
        <input
          type="text"
          name="filter"
          placeholder="Filter guests"
          className="input input-sm input-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="table table-zebra border-t-[0.5px] border-gray-800">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone No</th>
            <th>Guest Side</th>
            <th>Room</th>
            <th>RSVP</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => {
            return (
              <tr key={guest?._id} className="hover">
                <th>{index + 1}</th>
                <td>{guest?.name || "-"}</td>
                <td>{guest?.phoneNo || "-"}</td>
                <td>
                  <div
                    className={classNames(
                      "badge",
                      { "badge-secondary": guest?.side === "Komal" },
                      { "badge-accent": guest?.side === "Ankit" }
                    )}
                  >
                    {guest?.side || "-"}
                  </div>
                </td>
                <td>
                  <a
                    className="hover:underline underline-offset-4"
                    href={`/rooms/${guest?.room || ""}`}
                  >
                    {guest?.roomData?.type} - {guest?.roomData?.name}
                  </a>
                </td>
                <td>
                  {guest?.rsvp === "yes" ? (
                    <CheckCircleIcon className="w-4 h-4 text-success" />
                  ) : guest?.rsvp === "no" ? (
                    <XCircleIcon className="w-4 h-4 text-error" />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <GuestActions guest={guest} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const GuestActions = ({ guest }: { guest: CompleteGuest }) => {
  const removeGuest = useGuestStore((s) => s.removeGuest);
  const updateGuestRoom = useGuestStore((s) => s.updateGuestRoom);
  const removeGuestLoading = useGuestStore((s) => s.removeGuestLoading);
  const updateGuestRoomLoading = useGuestStore((s) => s.updateGuestRoomLoading);

  const editLoading =
    updateGuestRoomLoading[guest?._id] || removeGuestLoading[guest?._id];

  const handleInviteCopy = () => {
    const link = `${window.location.origin}/invite/details?id=${
      guest?._id || ""
    }`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        toast.success("Invite link copied to clipboard");
      });
    }
  };

  const handleRSVPInviteCopy = () => {
    const link = `${window.location.origin}/invite?id=${guest?._id || ""}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        toast.success("RSVP invite link copied to clipboard");
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-28 gap-2">
      <EnvelopeIcon
        className="w-4 h-4 cursor-pointer"
        onClick={handleRSVPInviteCopy}
      />
      <LinkIcon className="w-3 h-4 cursor-pointer" onClick={handleInviteCopy} />
      {editLoading ? (
        <PencilIcon className="w-3 h-4 text-gray-500" />
      ) : (
        <a
          href={`/manage/guest-form?type=edit&id=${guest?._id || ""}&room=${
            guest?.room || ""
          }&phoneNo=${guest?.phoneNo || ""}&side=${guest?.side}&name=${
            guest?.name || ""
          }`}
        >
          {<PencilIcon className="w-3 h-4 cursor-pointer" />}
        </a>
      )}
      {updateGuestRoomLoading[guest?._id] ? (
        <div className="loading loading-spinner h-4 w-4"></div>
      ) : (
        <RoomModal
          key={guest?._id}
          id={guest?._id}
          onUpdate={(r) => updateGuestRoom(guest?._id, r, guest?.room)}
        />
      )}
      {removeGuestLoading[guest?._id] ? (
        <div className="loading loading-spinner h-4 w-4"></div>
      ) : editLoading ? (
        <TrashIcon className="h-4 w-4 text-gray-500" />
      ) : (
        <button onClick={() => removeGuest(guest?._id, guest?.room)}>
          <TrashIcon className="h-4 w-4 text-error" />
        </button>
      )}
    </div>
  );
};

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

export default GuestTable;
