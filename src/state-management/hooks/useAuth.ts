import { useContext } from "react";
import UserContext from "../contexts/userContext";

const useAuth = () => useContext(UserContext);

export default useAuth;
