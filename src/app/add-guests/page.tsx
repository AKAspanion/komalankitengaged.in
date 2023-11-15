"use client";

import Hydrated from "@/components/Hydrated";
import { GuestSchema } from "@/schema/guest";
import { useGuestStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function AddGuests() {
  const router = useRouter();
  const addGuest = useGuestStore((state) => state.addGuest);
  const rooms = useGuestStore((state) => state.totalRooms);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const name =
        typeof formData.get("name") === "string"
          ? (formData.get("name") || "").toString()
          : "0";
      const peopleCount = parseInt(
        typeof formData.get("peopleCount") === "string"
          ? (formData.get("peopleCount") || "0").toString()
          : "0"
      );

      const body = { name, peopleCount };

      GuestSchema.parse(body);

      addGuest(body);

      router.push("/");
    } catch (error) {}
  }

  return (
    <div className="p-4">
      <h1 className="font-medium text-xl pl-1 pb-1">Add a guest</h1>
      <div className="text-sm text-gray-400 pl-1 pb-4">
        Total rooms present <p className="badge">{rooms}</p>
      </div>
      <form className="flex items-end w-full gap-4" onSubmit={onSubmit}>
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <input
            type="number"
            name="peopleCount"
            placeholder="Total people count"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated>
      <AddGuests />
    </Hydrated>
  );
}
