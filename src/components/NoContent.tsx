import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface NoContentProps {}

const NoContent: FC<NoContentProps> = ({}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center p-8 gap-3">
        <ExclamationTriangleIcon className="w-7 h-7 text-warning" />
        <div className="w-full text-sm text-center pb-16">
          No data available
        </div>
      </div>
    </div>
  );
};

export default NoContent;
