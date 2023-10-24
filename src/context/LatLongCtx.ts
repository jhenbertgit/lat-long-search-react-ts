import { createContext } from "react";

type Dataset = {
  lat: string;
  lng: string;
  address: string;
};

type State = {
  query: string;
  isOpen: boolean;
  isEmpty: boolean;
  status: string;
  dataset: Dataset;
};

type Action =
  | { type: "query"; payload: string }
  | { type: "isOpen"; isOpen: boolean }
  | { type: "status"; status: string }
  | { type: "dataset"; dataset: Dataset }
  | { type: "isEmpty"; isEmpty: boolean };

export const LatLongStateCtx = createContext<State>(null!);
export const LatLongDispatchCtx = createContext<React.Dispatch<Action>>(null!);

//reducer function
export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "query": {
      return { ...state, query: action.payload };
    }

    case "isOpen": {
      return { ...state, isOpen: action.isOpen };
    }

    case "isEmpty": {
      return { ...state, isEmpty: action.isEmpty };
    }

    case "status": {
      return { ...state, status: action.status };
    }

    case "dataset": {
      return { ...state, dataset: action.dataset };
    }

    default: {
      throw new Error();
    }
  }
};
