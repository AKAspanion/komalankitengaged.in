import { useRoomStore } from "@/store/room";
import { useEffect } from "react";

const useRoomDetailsByKey = (key?: string) => {
  const setRoomByKey = useRoomStore((s) => s.setRoomByKey);

  const roomDataByKey = useRoomStore((s) =>
    key ? s.roomData[key] : undefined
  );
  const roomDataLoadingByKey = useRoomStore((s) =>
    key ? s.roomDataLoading[key] : false
  );

  useEffect(() => {
    if (key) {
      setRoomByKey(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { roomDataByKey, roomDataLoadingByKey };
};

export default useRoomDetailsByKey;
