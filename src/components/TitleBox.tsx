import { ArrowLeftIcon, BackwardIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { FC } from "react";

interface TitleBoxProps {
  title: string;
  subtitle?: string;
  back?: string;
}

const TitleBox: FC<TitleBoxProps> = ({ title, subtitle, back = "" }) => {
  return (
    <div
      className={classNames("flex items-center gap-3", { "pb-4": !!subtitle })}
    >
      {back ? (
        <div className="mb-1">
          <a href={back}>
            <ArrowLeftIcon className="w-5 h-5" />
          </a>
        </div>
      ) : null}
      <div className="">
        <h1 className="font-medium text-xl pl-1 pb-1">{title}</h1>
        {subtitle ? (
          <div className="text-sm text-gray-400 pl-1">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TitleBox;
