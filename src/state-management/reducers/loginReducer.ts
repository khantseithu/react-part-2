interface LoginState {
  type: "LOGIN";
  username: string;
}

interface Logout {
  type: "LOGOUT";
}

type LoginAction = LoginState | Logout;

const loginReducer = (state: string, action: LoginAction) => {
  switch (action.type) {
    case "LOGIN":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
};

export default loginReducer;
