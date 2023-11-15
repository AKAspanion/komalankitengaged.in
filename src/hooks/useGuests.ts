import { useGuestStore } from "@/store/store";
import { useEffect } from "react";

const useGuests = () => {
  const guests = useGuestStore((s) => s.guests) || [];
  const loading = useGuestStore((s) => s.guestsLoading) || false;
  const setGuests = useGuestStore((s) => s.setGuests);

  useEffect(() => {
    setGuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { guests, loading };
};

export default useGuests;
