import { Room } from "@/schema/room";
import { LinkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { FC } from "react";
import toast from "react-hot-toast";

interface RoomCardProps {
  room: Room;
  inPage?: boolean;
}

const RoomCard: FC<RoomCardProps> = ({ room, inPage }) => {
  const badgeClass = room?.occupied
    ? room?.occupied >= room?.capacity
      ? "badge-error"
      : "badge-warning"
    : "badge-success";

  const handleLinkCopy = () => {
    const link = `${window.location.origin}/manage/rooms/key?key=${
      room?.key || ""
    }`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        toast.success("Room link copied to clipboard");
      });
    }
  };

  return (
    <div
      className={classNames(
        "p-4 border-[0.5px] rounded-lg bg-base-200",
        { "border-secondary": room.type === "HOTEL" },
        { "border-accent": room.type === "HOME" }
      )}
    >
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <div>{room?.name}</div>
          <div className="badge badge-neutral badge-outline">{room?.key}</div>
          {inPage ? (
            <div className="badge badge-neutral badge-outline cursor-pointer">
              <div className="cursor-pointer" onClick={handleLinkCopy}>
                <LinkIcon className="w-3 h-3" />
              </div>
            </div>
          ) : null}
        </div>
        <div className="text-sm text-gray-400">
          <p
            className={classNames(
              "badge",
              { "badge-secondary": room.type === "HOTEL" },
              { "badge-accent": room.type === "HOME" }
            )}
          >
            {room?.type}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <div className="text-sm text-gray-400">
          Capacity <p className="badge badge-primary">{room?.capacity}</p>
        </div>
        <div className="text-sm text-gray-400">
          Occupied{" "}
          <p className={classNames("badge badge-neutral", badgeClass)}>
            {room?.occupied || "0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
