import { CompleteGuest, Guest, GuestBody, RSVPType } from "@/schema/guest";
import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/utils/error";
import toast from "react-hot-toast";
import { Room } from "@/schema/room";

export const useGuestStore = create<GuestStore>((set, get) => ({
  guests: undefined,
  guestsLoading: false,
  addGuestLoading: false,
  updateGuestLoading: false,
  setGuestRSVPLoading: false,
  removeGuestLoading: {},
  updateGuestRoomLoading: {},
  guestDataLoading: {},
  guestData: {},
  setGuest: async (id: string) => {
    try {
      const loading = get().guestDataLoading;
      if (!loading[id]) {
        set((s) => ({
          guestDataLoading: { ...s.guestDataLoading, [id]: true },
        }));
        const { data } = await axiosInstance.get<AppAPIRespose<CompleteGuest>>(
          "/api/guest/" + id
        );

        set((s) => ({
          guestData: { ...s.guestData, [id]: data.data },
          guestDataLoading: { ...s.guestDataLoading, [id]: false },
        }));
        return true;
      }
      return false;
    } catch (error) {
      set((s) => ({
        guestDataLoading: { ...s.guestDataLoading, [id]: false },
      }));
      return false;
    }
  },
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
        const { data } = await axiosInstance.post<AppAPIRespose<CompleteGuest>>(
          "/api/guest",
          newGuest
        );

        set(() => ({ addGuestLoading: false }));
        return data?.data;
      }
      return false;
    } catch (error) {
      set(() => ({ guestsLoading: false }));
      toast.error(getErrorMessage(error));
      return false;
    }
  },
  removeGuest: async (id, room) => {
    try {
      const loading = get().removeGuestLoading;
      if (!loading[id]) {
        set((s) => ({
          removeGuestLoading: { ...s.removeGuestLoading, [id]: true },
        }));
        const res = await axiosInstance.delete(
          `/api/guest/${id}?room=${room || ""}`
        );

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
  updateGuestRoom: async (id, room, prevRoom) => {
    try {
      const loading = get().updateGuestRoomLoading;
      if (!loading[id]) {
        set((s) => ({
          updateGuestRoomLoading: { ...s.updateGuestRoomLoading, [id]: true },
        }));
        const res = await axiosInstance.put("/api/guest/" + id + "/room", {
          room: room._id,
          prevRoom: prevRoom || "",
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
  updateGuest: async (id, guest, prevRoom) => {
    try {
      const newGuest = { ...guest };

      const loading = get().updateGuestLoading;
      if (!loading) {
        set(() => ({ updateGuestLoading: true }));
        await axiosInstance.put(
          `/api/guest/${id}?room=${prevRoom || ""}`,
          newGuest
        );

        set(() => ({ updateGuestLoading: false }));
        return true;
      }
      return false;
    } catch (error) {
      set(() => ({ updateGuestLoading: false }));
      toast.error(getErrorMessage(error));
      return false;
    }
  },
  setGuestRSVP: async (id, rsvp) => {
    try {
      const loading = get().setGuestRSVPLoading;
      if (!loading) {
        set(() => ({ setGuestRSVPLoading: true }));
        await axiosInstance.put(`/api/guest/${id}/rsvp`, { rsvp });

        set(() => ({ setGuestRSVPLoading: false }));
        return true;
      }
      return false;
    } catch (error) {
      set(() => ({ setGuestRSVPLoading: false }));
      toast.error(getErrorMessage(error));
      return false;
    }
  },
}));

type GuestStore = {
  guests?: CompleteGuest[];
  guestsLoading: boolean;
  addGuestLoading: boolean;
  updateGuestLoading: boolean;
  setGuestRSVPLoading: boolean;
  removeGuestLoading: Record<string, boolean>;
  updateGuestRoomLoading: Record<string, boolean>;
  addGuest: (guest: GuestBody) => Promise<boolean | CompleteGuest>;
  updateGuest: (
    id: string,
    guest: GuestBody,
    prevRoom?: string
  ) => Promise<boolean>;
  setGuests: () => Promise<boolean>;
  removeGuest: (id: string, room?: string) => Promise<boolean>;
  updateGuestRoom: (
    guest: string,
    room: Room,
    prevRoom?: string
  ) => Promise<boolean>;
  guestDataLoading: Record<string, boolean>;
  guestData: Record<string, CompleteGuest>;
  setGuest: (id: string) => Promise<boolean>;
  setGuestRSVP: (id: string, rsvp: RSVPType) => Promise<boolean>;
};
