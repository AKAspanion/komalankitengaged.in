import { FC } from "react";

interface ContentLoaderProps {}

const ContentLoader: FC<ContentLoaderProps> = ({}) => {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[420px]">
      <div className="loading loading-ring loading-lg"></div>
    </div>
  );
};

export default ContentLoader;
