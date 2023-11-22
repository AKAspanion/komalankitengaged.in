"use client";

import React from "react";
import { useCountdown } from "@/hooks/useCountdown";

type TimerProps = {
  targetDate: number;
};

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return null;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div
      className={
        "flex gap-1 pt-4 font-semibold tracking-wide uppercase text-[10px]"
      }
    >
      <DateTimeDisplay value={days} type={"Days"} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Hours"} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Secs"} />
    </div>
  );
};

type DateType = "Days" | "Hours" | "Mins" | "Secs";

const DateTimeDisplay = ({
  value,
  type,
}: {
  value: number;
  type: DateType;
}) => {
  return (
    <div className={"flex gap-1"}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default Timer;
