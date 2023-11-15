"use client";

import ContentLoader from "@/components/ContentLoader";
import Hydrated from "@/components/Hydrated";
import useGuests from "@/hooks/useGuests";
import { useGuestStore } from "@/store/store";
import { TrashIcon } from "@heroicons/react/24/solid";

function Home() {
  const { guests, loading } = useGuests();
  const removeGuest = useGuestStore((s) => s.removeGuest);
  const removeGuestLoading = useGuestStore((s) => s.removeGuestLoading);

  return loading ? (
    <ContentLoader />
  ) : guests?.length <= 0 ? (
    <div className="w-full p-8 text-center">No data available</div>
  ) : (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone No</th>
              <th>People Count</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => {
              return (
                <tr key={guest._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{guest.name}</td>
                  <td>{guest.phoneNo}</td>
                  <td>{guest.peopleCount}</td>
                  <td>{guest.room}</td>
                  <td>
                    <div className="flex items-center justify-center w-8">
                      {removeGuestLoading[guest._id] ? (
                        <div className="loading loading-ring loading-sm"></div>
                      ) : (
                        <button onClick={() => removeGuest(guest._id)}>
                          <TrashIcon className="h-4 w-4 text-error" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Hydrated>
      <Home />
    </Hydrated>
  );
}
