import { Room } from "@/schema/room";
import classNames from "classnames";
import { FC } from "react";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const badgeClass = room?.occupied
    ? room?.occupied >= room?.capacity
      ? "badge-error"
      : "badge-warning"
    : "badge-success";

  return (
    <div
      className={classNames(
        "p-4 border-[0.5px] rounded-lg bg-base-200",
        { "border-secondary": room.type === "HOTEL" },
        { "border-accent": room.type === "HOME" }
      )}
    >
      <div className="flex flex-wrap justify-between items-center gap-3F">
        <div className="">{room?.name}</div>
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
