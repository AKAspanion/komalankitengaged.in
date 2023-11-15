import axiosInstance from "@/lib/axios";
import { Room } from "@/schema/room";
import { create } from "zustand";

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: undefined,
  roomsLoading: false,
  setRooms: async () => {
    try {
      const loading = get().roomsLoading;
      if (!loading) {
        set(() => ({ roomsLoading: true }));
        const { data } = await axiosInstance.get<AppAPIRespose<Room[]>>(
          "/api/room"
        );

        set(() => ({ rooms: [...data.data], roomsLoading: false }));
        return true;
      }
      return false;
    } catch (error) {
      set(() => ({ roomsLoading: false }));
      return false;
    }
  },
}));

export type RoomStore = {
  rooms?: Room[];
  roomsLoading?: boolean;
  setRooms: () => Promise<boolean>;
};
