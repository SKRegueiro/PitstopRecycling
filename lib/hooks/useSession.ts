import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";

const useSession = () => {
  return useContext(AuthContext);
};

export default useSession;
