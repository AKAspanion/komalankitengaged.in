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
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-semibold">Unauthorized</h2>
        <div className="text-gray-400">Pleae login to continue</div>
        <a href="/login">
          <button className="btn mt-4 flex gap-1 w-fit">
            <div>Login</div>
          </button>
        </a>
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
