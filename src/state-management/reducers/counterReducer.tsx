interface Action {
  type: "INCREMENT" | "DECREMENT";
}

const counterReducer = (state: number, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return 0;
    default:
      return state;
  }
};

export { counterReducer };
