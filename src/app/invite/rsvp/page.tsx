"use client";

import { FC, useEffect, useState } from "react";

import Hydrated from "@/components/Hydrated";
import { useSearchParams } from "next/navigation";
import useGuestDetails from "@/hooks/useGuestDetails";
import ContentLoader from "@/components/ContentLoader";
import FlowerBackground from "@/components/FlowerBackground";
import { RSVPType } from "@/schema/guest";
import { useGuestStore } from "@/store/guest";
import toast from "react-hot-toast";
import classNames from "classnames";

interface RSVPProps {}

const RSVP: FC<RSVPProps> = ({}) => {
  const [id, setId] = useState("");
  const searchParams = useSearchParams();

  const setGuestRSVP = useGuestStore((s) => s.setGuestRSVP);
  const setGuestRSVPLoading = useGuestStore((s) => s.setGuestRSVPLoading);
  const { guestData, guestDataLoading } = useGuestDetails(
    searchParams?.get("id") || ""
  );

  const [answer, setAnswer] = useState<RSVPType>(guestData?.rsvp);

  const handleRSVP = async (response: RSVPType, currentRsvp?: RSVPType) => {
    if (setGuestRSVPLoading) return;

    const guestId = guestData?._id || id;
    console.log({ currentRsvp });
    if (guestId && !currentRsvp) {
      const res = await setGuestRSVP(guestId, response);
      if (res) {
        setAnswer(response);
        toast.success("RSVP set successfully");
      }
    }
  };

  useEffect(() => {
    if (guestData?.rsvp) {
      setAnswer(guestData?.rsvp);
    }
  }, [guestData?.rsvp]);

  useEffect(() => {
    if (searchParams) {
      const rsvp = searchParams.get("id");

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
