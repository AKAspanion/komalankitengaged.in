import { useRoomStore } from "@/store/room";
import { useEffect, useMemo } from "react";

const useRooms = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rooms = useRoomStore((s) => s.rooms) || [];
  const loading = useRoomStore((s) => s.roomsLoading) || false;
  const setRooms = useRoomStore((s) => s.setRooms);

  const hotelRooms = useMemo(() => {
    return rooms?.filter((r) => r.type === "HOTEL");
  }, [rooms]);

  const homeRooms = useMemo(() => {
    return rooms?.filter((r) => r.type === "HOME");
  }, [rooms]);

  useEffect(() => {
    setRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rooms, hotelRooms, homeRooms, loading };
};

export default useRooms;
