import axiosInstance from "@/lib/axios";
import { CompleteRoom, Room } from "@/schema/room";
import { create } from "zustand";

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: undefined,
  roomsLoading: false,
  roomDataLoading: {},
  roomData: {},
  setRoom: async (id: string) => {
    try {
      const loading = get().roomDataLoading;
      if (!loading[id]) {
        set((s) => ({
          roomDataLoading: { ...s.roomDataLoading, [id]: true },
        }));
        const { data } = await axiosInstance.get<AppAPIRespose<CompleteRoom>>(
          "/api/room/" + id
        );

        set((s) => ({
          roomData: { ...s.roomData, [id]: data.data },
          roomDataLoading: { ...s.roomDataLoading, [id]: false },
        }));
        return true;
      }
      return false;
    } catch (error) {
      set((s) => ({
        roomDataLoading: { ...s.roomDataLoading, [id]: false },
      }));
      return false;
    }
  },
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
  roomDataLoading: Record<string, boolean>;
  roomData: Record<string, CompleteRoom>;
  setRoom: (id: string) => Promise<boolean>;
  setRooms: () => Promise<boolean>;
};
