import { createContext, useContext, useMemo, useState } from "react";

const Context = createContext();

export default function AppContext({ children }) {
  const [state, setState] = useState({
    token: JSON.parse(localStorage.getItem("token")) || "",
    user: JSON.parse(localStorage.getItem("user")) || "",
    accounts: [],
    transactions: [],
    navIsOpen: false,
  });

  const value = useMemo(() => ({ state, setState }), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAppContext() {
  const { state, setState } = useContext(Context);

  return [state, setState];
}
