import { Guest } from "@/schema/guest";
import { useEffect, useState } from "react";
import { uid } from "uid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGuestStore = create(
  persist<GuestStore>(
    (set, get) => ({
      guests: [],
      totalRooms: 20,
      addGuest: (guest) => {
        const newGuest = { ...guest, _id: uid() };

        set(
          (s) => ({ guests: [newGuest, ...(s.guests || [])], totalRooms: 10 }),
          true
        );
      },
      removeGuest: (id) => {
        set(
          (s) => ({ guests: (s.guests || []).filter((g) => g._id !== id) }),
          true
        );
      },
    }),
    {
      name: "guest-storage",
    }
  )
);

type GuestStore = {
  guests: Guest[];
  totalRooms: number;
  addGuest: (guest: Omit<Guest, "_id">) => void;
  removeGuest: (id: string) => void;
};
