import { useEffect } from "react";

const useRoomDetails = (room?: string) => {
  useEffect(() => {
    if (room) {
      console.log({ room });
    }
  }, [room]);
  return {};
};

export default useRoomDetails;
