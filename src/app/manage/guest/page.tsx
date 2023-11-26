"use client";

import Authorized from "@/components/Authorized";
import ContentLoader from "@/components/ContentLoader";
import Hydrated from "@/components/Hydrated";
import NoContent from "@/components/NoContent";
import useGuests from "@/hooks/useGuests";
import GuestTable from "./guest-table";
import TitleBox from "@/components/TitleBox";

function Home() {
  const { guests, loading } = useGuests();

  return loading ? (
    <ContentLoader />
  ) : guests?.length <= 0 ? (
    <NoContent />
  ) : (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="px-3">
          <TitleBox title="Guests" subtitle="List of available guests" />
        </div>
        <div className="text-sm underline-offset-4 underline mr-4">
          <a href="/manage/guest/rsvp">RSVP Guests</a>
        </div>
      </div>
      <div className="overflow-x-auto border-t-[0.5px] border-gray-800">
        <GuestTable guests={guests} />
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
