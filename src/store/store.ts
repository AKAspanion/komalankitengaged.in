import axios from "axios";
import { Guest, GuestBody } from "@/schema/guest";
import { create } from "zustand";

export const useGuestStore = create<GuestStore>(
  // persist<GuestStore>(
  (set, get) => ({
    guests: undefined,
    guestsLoading: false,
    setGuestLoading: false,
    removeGuestLoading: {},
    totalRooms: 20,
    setGuests: async () => {
      try {
        const loading = get().guestsLoading;
        if (!loading) {
          set(() => ({ guestsLoading: true }));
          const { data } = await axios.get<AppAPIRespose<Guest[]>>(
            "/api/guest"
          );

          set(() => ({ guests: [...data.data], guestsLoading: false }));
          return true;
        }
        return false;
      } catch (error) {
        set(() => ({ guests: [], guestsLoading: false }));
        return false;
      }
    },
    setGuest: async (guest) => {
      try {
        const newGuest = { ...guest };

        const loading = get().setGuestLoading;
        if (!loading) {
          set(() => ({ setGuestLoading: true }));
          await axios.post<AppAPIRespose<Guest>>("/api/guest", newGuest);

          set(() => ({ setGuestLoading: false }));
          return true;
        }
        return false;
      } catch (error) {
        set(() => ({ guestsLoading: false }));
        return false;
      }
    },
    removeGuest: async (id) => {
      try {
        const loading = get().removeGuestLoading;
        if (!loading[id]) {
          set((s) => ({
            removeGuestLoading: { ...s.removeGuestLoading, [id]: true },
          }));
          await axios.delete<AppAPIRespose<Guest>>("/api/guest/" + id);

          set((s) => ({
            guests: (s.guests || []).filter((g) => g._id !== id),
            removeGuestLoading: { ...s.removeGuestLoading, [id]: false },
          }));
          return true;
        }
        return false;
      } catch (error) {
        set((s) => ({
          removeGuestLoading: { ...s.removeGuestLoading, [id]: false },
        }));
        return false;
      }
    },
  })
  // {
  //   name: "guest-storage",
  // }
  // )
);

type GuestStore = {
  guests?: Guest[];
  totalRooms: number;
  guestsLoading: boolean;
  setGuestLoading: boolean;
  removeGuestLoading: Record<string, boolean>;
  setGuest: (guest: GuestBody) => Promise<boolean>;
  setGuests: () => Promise<boolean>;
  removeGuest: (id: string) => Promise<boolean>;
};
