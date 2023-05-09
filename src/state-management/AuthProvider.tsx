import { useReducer } from "react";
import loginReducer from "./reducers/loginReducer";
import UserContext from "./contexts/userContext";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, userDispatch] = useReducer(loginReducer, "");
  return (
    <UserContext.Provider value={{ user, dispatch: userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default AuthProvider;
