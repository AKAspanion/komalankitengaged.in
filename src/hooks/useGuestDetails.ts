import { useGuestStore } from "@/store/guest";
import { useEffect } from "react";

const useGuestDetails = (guest?: string) => {
  const setGuest = useGuestStore((s) => s.setGuest);

  const guestData = useGuestStore((s) =>
    guest ? s.guestData[guest] : undefined
  );
  const guestDataLoading = useGuestStore((s) =>
    guest ? s.guestDataLoading[guest] : false
  );

  useEffect(() => {
    if (guest) {
      setGuest(guest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guest]);

  return { guestData, guestDataLoading };
};

export default useGuestDetails;
