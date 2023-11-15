import { Room } from "@/schema/room";
import classNames from "classnames";
import { FC } from "react";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  return (
    <div
      className={classNames(
        "p-4 border-[0.5px] rounded-lg bg-base-200 cursor-pointer",
        { "border-secondary": room.type === "HOTEL" },
        { "border-accent": room.type === "HOME" }
      )}
    >
      <div className="">{room?.name}</div>
      <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
        <div className="text-sm text-gray-400">
          Capacity <p className="badge badge-neutral">{room?.capacity}</p>
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
    </div>
  );
};

export default RoomCard;
