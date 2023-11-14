"use client";

import Hydrated from "@/components/Hydrated";
import { useGuestStore } from "@/store/store";

function Home() {
  const { guests } = useGuestStore();

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>People Count</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => {
              return (
                <tr key={guest.id} className="hover cursor-pointer">
                  <th>{index + 1}</th>
                  <td>{guest.name}</td>
                  <td>-</td>
                  <td>{guest.peopleCount}</td>
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
