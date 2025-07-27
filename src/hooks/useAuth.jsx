import { useContext } from "react";
import AuthContext from "../contextApi/AuthContext";
const useAuth = () => {
  let authShare = useContext(AuthContext);
  return authShare;
};

export default useAuth;
