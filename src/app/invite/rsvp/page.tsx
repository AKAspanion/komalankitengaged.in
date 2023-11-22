"use client";

import { FC, FormEvent, useEffect, useState } from "react";

import Hydrated from "@/components/Hydrated";
import { useSearchParams } from "next/navigation";
import useGuestDetails from "@/hooks/useGuestDetails";
import ContentLoader from "@/components/ContentLoader";
import FlowerBackground from "@/components/FlowerBackground";
import { GuestSchema, RSVPType } from "@/schema/guest";
import { useGuestStore } from "@/store/guest";
import toast from "react-hot-toast";
import classNames from "classnames";
import {
  getIdFromUrlAndLocalStorage,
  undefEmptyString,
} from "@/utils/validate";
import { getErrorMessage } from "@/utils/error";
import { useRouter } from "next/navigation";

interface RSVPProps {}

const RSVP: FC<RSVPProps> = ({}) => {
  const router = useRouter();
  const [guestID, setId] = useState("");
  const searchParams = useSearchParams();

  const addGuest = useGuestStore((state) => state.addGuest);
  const addGuestLoading = useGuestStore((state) => state.addGuestLoading);
  const setGuestRSVP = useGuestStore((s) => s.setGuestRSVP);
  const setGuestRSVPLoading = useGuestStore((s) => s.setGuestRSVPLoading);

  const urlId = getIdFromUrlAndLocalStorage(searchParams);

  const { guestData, guestDataLoading } = useGuestDetails(urlId);

  const [answer, setAnswer] = useState<RSVPType>(guestData?.rsvp);

  const handleRSVP = async (response: RSVPType, currentRsvp?: RSVPType) => {
    if (setGuestRSVPLoading) return;

    const gid = guestData?._id || guestID;
    if (gid && !currentRsvp) {
      const res = await setGuestRSVP(gid, response);
      if (res) {
        setAnswer(response);
        toast.success("RSVP added successfully");
      }
    }
  };

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    if (addGuestLoading) return;
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const rsvp = "yes" as RSVPType;
      const name = (formData.get("guestName") || "").toString();
      const phoneNo = undefEmptyString(
        (formData.get("phoneNo") || "").toString()
      );
      const body = { name, phoneNo, rsvp, rsvpForm: true };

      GuestSchema.parse(body);

      const success = await addGuest(body);
      if (success) {
        toast.success("RSVP added succesfully");

        if (typeof success !== "boolean") {
          setId(success?._id);
          router.push(`/invite/rsvp?id=${success?._id}`);
          localStorage.setItem("userId", `${success?._id}`);
        }
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  useEffect(() => {
    if (guestData?.rsvp) {
      setAnswer(guestData?.rsvp);
    }
  }, [guestData?.rsvp]);

  useEffect(() => {
    if (searchParams) {
      const localId = localStorage.getItem("userId");
      const id = getIdFromUrlAndLocalStorage(searchParams);

      const rsvp = localId || id;

      if (rsvp) {
        setId(rsvp);
      }
    }
  }, [searchParams]);

  return guestDataLoading ? (
    <ContentLoader />
  ) : (
    <FlowerBackground>
      <div>
        <div className="uppercase text-4xl font-thin">Are you attending?</div>
        {setGuestRSVPLoading || setGuestRSVPLoading ? (
          <div className="loading loading-ring m-5 p-1 h-12"></div>
        ) : !guestData ? (
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-3 uppercase py-6"
          >
            <input
              className="border border-black bg-white p-3"
              placeholder="Your name"
              name="guestName"
              required
            ></input>
            <input
              className="border border-black bg-white p-3"
              placeholder="Your mobile no"
              name="phoneNo"
              required
            ></input>
            <button
              type="submit"
              className="border border-black bg-white p-3 uppercase"
            >
              {addGuestLoading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        ) : (
          <div className="p-3 pb-8">
            <div
              className={classNames(
                "flex gap-4 items-center justify-center light h-12",
                { "opacity-50": setGuestRSVPLoading }
              )}
            >
              <div
                className="form-control"
                onClick={() => handleRSVP("yes", guestData?.rsvp)}
              >
                <label className="label cursor-pointer flex gap-2">
                  <div className="">Yes</div>
                  <input
                    type="checkbox"
                    disabled={!!answer}
                    checked={answer === "yes"}
                    className="checkbox checkbox-secondary"
                  />
                </label>
              </div>
              <div
                className="form-control"
                onClick={() => handleRSVP("no", guestData?.rsvp)}
              >
                <label className="label cursor-pointer flex gap-2">
                  <div className="">No</div>
                  <input
                    type="checkbox"
                    disabled={!!answer}
                    checked={answer === "no"}
                    className="checkbox checkbox-secondary"
                  />
                </label>
              </div>
            </div>
            {answer ? (
              <div className="font-light p-6">Thank you for the response! </div>
            ) : null}
          </div>
        )}
      </div>
    </FlowerBackground>
  );
};

export default function Page() {
  return (
    <Hydrated>
      <RSVP />
    </Hydrated>
  );
}
