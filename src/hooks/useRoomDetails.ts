import { useRoomStore } from "@/store/room";
import { useEffect } from "react";

const useRoomDetails = (room?: string) => {
  const setRoom = useRoomStore((s) => s.setRoom);

  const roomDataById = useRoomStore((s) =>
    room ? s.roomData[room] : undefined
  );
  const roomDataLoadingById = useRoomStore((s) =>
    room ? s.roomDataLoading[room] : false
  );

  useEffect(() => {
    if (room) {
      setRoom(room);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  return { roomDataById, roomDataLoadingById };
};

export default useRoomDetails;
