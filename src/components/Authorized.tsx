import { useUserStore } from "@/store/user";
import { FC } from "react";
import Hydrated from "./Hydrated";

interface AuthorizedProps {
  children: React.ReactNode;
}

const HyderatedAuthorized: FC<AuthorizedProps> = ({ children }) => {
  const token = useUserStore((s) => s.token);
  if (token) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full text-center flex justify-center items-center">
      <div>
        <h2 className="text-xl font-semibold">Unauthorized</h2>
        <div className="text-gray-400">
            {"You don't have permission to access this page. Pleae login to continue."}
        </div>
        <div className="pb-16"></div>
      </div>
    </div>
  );
};

const Authorized: FC<AuthorizedProps> = (props) => {
  return (
    <Hydrated>
      <HyderatedAuthorized {...props} />
    </Hydrated>
  );
};

export default Authorized;
