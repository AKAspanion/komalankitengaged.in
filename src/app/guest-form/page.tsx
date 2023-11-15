"use client";

import Authorized from "@/components/Authorized";
import useRooms from "@/hooks/useRooms";
import { GuestSchema } from "@/schema/guest";
import { useGuestStore } from "@/store/guest";
import { getErrorMessage } from "@/utils/error";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";

function AddGuests() {
  const router = useRouter();
  const { rooms, loading: roomLoading } = useRooms();
  const setGuest = useGuestStore((state) => state.setGuest);
  const guestLoading = useGuestStore((state) => state.setGuestLoading);

  const loading = roomLoading || guestLoading;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      if (loading) return;
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
      const phoneNo = parseInt(
        typeof formData.get("phoneNo") === "string"
          ? (formData.get("phoneNo") || "0").toString()
          : "0"
      );
      const room =
        typeof formData.get("room") === "string"
          ? (formData.get("room") || "0").toString()
          : "0";

      const body = { name, room, phoneNo, peopleCount };

      GuestSchema.parse(body);

      const success = await setGuest(body);
      if (success) {
        toast.success("Added succesfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const type = searchParams.get("type");
      console.log(type);
    }
  }, [searchParams]);

  return (
    <div className="p-4">
      <h1 className="font-medium text-xl pl-1 pb-1">Add a guest</h1>
      <div className="text-sm text-gray-400 pl-1 pb-4">
        Total rooms present <p className="badge">{rooms?.length}</p>
      </div>
      <form className="flex w-full gap-4 flex-col" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone number"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              name="peopleCount"
              placeholder="Total people count"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <select name="room" className="select select-bordered">
              <option disabled selected>
                Select Room
              </option>
              {rooms.map((r) => {
                return (
                  <option key={r._id} value={r._id}>
                    {r.type} - {r.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-fu"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Authorized>
      <AddGuests />
    </Authorized>
  );
}
