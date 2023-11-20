"use client";

import Authorized from "@/components/Authorized";
import useRooms from "@/hooks/useRooms";
import { GuestSchema, GuestSide } from "@/schema/guest";
import { useGuestStore } from "@/store/guest";
import { getErrorMessage } from "@/utils/error";
import { undefEmptyString } from "@/utils/validate";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function GuestForm() {
  const router = useRouter();
  const { rooms, loading: roomLoading } = useRooms();
  const addGuest = useGuestStore((state) => state.addGuest);
  const updateGuest = useGuestStore((state) => state.updateGuest);
  const guestLoading = useGuestStore((state) => state.addGuestLoading);
  const updateGuestLoading = useGuestStore((state) => state.updateGuestLoading);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [prevRoom, setPrevRoom] = useState("");

  const loading = roomLoading || guestLoading || updateGuestLoading;

  const getBody = (event: FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(event.currentTarget);

      const name = (formData.get("guestName") || "").toString();
      const side = undefEmptyString(
        (formData.get("side") || "").toString()
      ) as GuestSide;
      const phoneNo = undefEmptyString(
        (formData.get("phoneNo") || "").toString()
      );
      const room = undefEmptyString((formData.get("room") || "").toString());

      const body = { name, room, side, phoneNo };

      GuestSchema.parse(body);

      return body;
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  async function onEditSubmit(event: FormEvent<HTMLFormElement>) {
    if (loading) return;
    event.preventDefault();

    const body = getBody(event);

    if (body) {
      const success = await updateGuest(editId, body, prevRoom);
      if (success) {
        toast.success("Updated succesfully");
      }
    }
  }

  async function onAddSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      if (loading) return;
      event.preventDefault();

      const body = getBody(event);

      if (body) {
        const success = await addGuest(body);
        if (success) {
          toast.success("Added succesfully");
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const type = searchParams.get("type");
      const canEdit = type === "edit";
      setIsEdit(canEdit);
      setEditId(searchParams.get("id") || "");
      setPrevRoom(searchParams.get("room") || "");
    }
  }, [searchParams]);

  return (
    <div className="px-4 pb-4">
      <h1 className="font-medium text-xl pl-1 pb-1">
        {isEdit ? "Update guest" : "Add a guest"}
      </h1>
      <div className="text-sm text-gray-400 pl-1 pb-4">
        Total rooms present <p className="badge">{rooms?.length}</p>
      </div>
      <form
        className="flex w-full gap-4 flex-col"
        onSubmit={(e) => (isEdit ? onEditSubmit(e) : onAddSubmit(e))}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
          <div className="form-control">
            <input
              required
              type="text"
              name="guestName"
              placeholder="Name"
              className="input input-bordered"
              defaultValue={searchParams?.get("name") || ""}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone number"
              className="input input-bordered"
              defaultValue={searchParams?.get("phoneNo") || ""}
            />
          </div>
          <div className="form-control">
            <select required name="side" className="select select-bordered">
              <option disabled selected>
                Select Guest Side
              </option>
              {["Komal", "Ankit"].map((r) => {
                return (
                  <option
                    key={r}
                    value={r}
                    selected={searchParams?.get("side") === r}
                  >
                    {r}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control">
            <select name="room" className="select select-bordered">
              <option disabled selected>
                Select Room
              </option>
              {rooms.map((r) => {
                return (
                  <option
                    key={r._id}
                    value={r._id}
                    selected={searchParams?.get("room") === r._id}
                  >
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
          ) : isEdit ? (
            "Update"
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
      <GuestForm />
    </Authorized>
  );
}
