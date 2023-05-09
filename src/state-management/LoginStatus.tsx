import { useContext, useReducer, useState } from "react";
import loginReducer from "./reducers/loginReducer";
import UserContext from "./contexts/userContext";

const LoginStatus = () => {
  const { user, dispatch } = useContext(UserContext);
  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => dispatch({ type: "LOGOUT" })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a
        onClick={() => dispatch({ type: "LOGIN", username: "sithu" })}
        href="#"
      >
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
