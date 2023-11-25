"use client";

import Authorized from "@/components/Authorized";
import ContentLoader from "@/components/ContentLoader";
import Hydrated from "@/components/Hydrated";
import NoContent from "@/components/NoContent";
import GuestTable from "../guest-table";
import useRSVPGuests from "@/hooks/useRSVPGuests";

function Home() {
  const { guests, loading } = useRSVPGuests();

  return loading ? (
    <ContentLoader />
  ) : guests?.length <= 0 ? (
    <NoContent />
  ) : (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="px-3">
          <h1 className="font-medium text-xl pl-1 pb-1">RSVP Guests</h1>
          <div className="text-sm text-gray-400 pl-1 pb-4">
            List of rsvp guests
          </div>
        </div>
        <div className="text-sm underline-offset-4 underline mr-4">
          <a href="/manage/guest">Guests</a>
        </div>
      </div>
      <div className="overflow-x-auto border-t-[0.5px] border-gray-800">
        <GuestTable guests={guests} rsvp />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated>
      <Authorized>
        <Home />
      </Authorized>
    </Hydrated>
  );
}