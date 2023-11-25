import { useGuestStore } from "@/store/guest";
import { useEffect } from "react";

const useRSVPGuests = () => {
  const guests = useGuestStore((s) => s.rsvpGuests) || [];
  const loading = useGuestStore((s) => s.rsvpGuestsLoading) || false;
  const setRSVPGuests = useGuestStore((s) => s.setRSVPGuests);

  useEffect(() => {
    setRSVPGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { guests, loading };
};

export default useRSVPGuests;
