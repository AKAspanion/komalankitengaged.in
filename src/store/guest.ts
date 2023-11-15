import { CompleteGuest, GuestBody } from "@/schema/guest";
import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/utils/error";
import toast from "react-hot-toast";
import { Room } from "@/schema/room";

export const useGuestStore = create<GuestStore>(
  // persist<GuestStore>(
  (set, get) => ({
    guests: undefined,
    guestsLoading: false,
    addGuestLoading: false,
    removeGuestLoading: {},
    updateGuestRoomLoading: {},
    totalRooms: 20,
    setGuests: async () => {
      try {
        const loading = get().guestsLoading;
        if (!loading) {
          set(() => ({ guestsLoading: true }));
          const { data } = await axiosInstance.get<
            AppAPIRespose<CompleteGuest[]>
          >("/api/guest");

          set(() => ({ guests: [...data.data], guestsLoading: false }));
          return true;
        }
        return false;
      } catch (error) {
        set(() => ({ guests: [], guestsLoading: false }));
        return false;
      }
    },
    addGuest: async (guest) => {
      try {
        const newGuest = { ...guest };

        const loading = get().addGuestLoading;
        if (!loading) {
          set(() => ({ addGuestLoading: true }));
          await axiosInstance.post("/api/guest", newGuest);

          set(() => ({ addGuestLoading: false }));
          return true;
        }
        return false;
      } catch (error) {
        set(() => ({ guestsLoading: false }));
        toast.error(getErrorMessage(error));
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
          const res = await axiosInstance.delete("/api/guest/" + id);

          if (res) {
            set((s) => ({
              guests: (s.guests || []).filter((g) => g._id !== id),
              removeGuestLoading: { ...s.removeGuestLoading, [id]: false },
            }));
            return true;
          }
        }
        return false;
      } catch (error) {
        set((s) => ({
          removeGuestLoading: { ...s.removeGuestLoading, [id]: false },
        }));
        toast.error(getErrorMessage(error));
        return false;
      }
    },
    updateGuestRoom: async (id, room) => {
      try {
        const loading = get().updateGuestRoomLoading;
        if (!loading[id]) {
          set((s) => ({
            updateGuestRoomLoading: { ...s.updateGuestRoomLoading, [id]: true },
          }));
          const res = await axiosInstance.put("/api/guest/" + id + "/room", {
            room: room._id,
          });

          if (res) {
            set((s) => {
              const guestLists = s.guests || [];
              const guestListIndex = guestLists.findIndex((g) => g._id === id);

              if (guestListIndex > -1) {
                guestLists[guestListIndex] = {
                  ...guestLists[guestListIndex],
                  roomData: room,
                };
                return {
                  guests: structuredClone(guestLists),
                  updateGuestRoomLoading: {
                    ...s.updateGuestRoomLoading,
                    [id]: false,
                  },
                };
              } else {
                return {
                  updateGuestRoomLoading: {
                    ...s.updateGuestRoomLoading,
                    [id]: false,
                  },
                };
              }
            });
            return true;
          }
        }
        return false;
      } catch (error) {
        set((s) => ({
          updateGuestRoomLoading: { ...s.updateGuestRoomLoading, [id]: false },
        }));
        toast.error(getErrorMessage(error));
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
  guests?: CompleteGuest[];
  totalRooms: number;
  guestsLoading: boolean;
  addGuestLoading: boolean;
  removeGuestLoading: Record<string, boolean>;
  updateGuestRoomLoading: Record<string, boolean>;
  addGuest: (guest: GuestBody) => Promise<boolean>;
  setGuests: () => Promise<boolean>;
  removeGuest: (id: string) => Promise<boolean>;
  updateGuestRoom: (id: string, room: Room) => Promise<boolean>;
};
