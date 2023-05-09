import { createContext } from "react";
import { LoginAction } from "../reducers/loginReducer";

interface UserContextType {
  user: string;
  dispatch: React.Dispatch<LoginAction>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export default UserContext;
