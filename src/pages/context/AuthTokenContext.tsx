import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../Login/login.api";
import type { User } from "../Login/login.interface";

type AuthTokenContextType = {
  userData: User | null;
  setData: React.Dispatch<React.SetStateAction<User | null>>;
};

export const tokenContext = createContext<AuthTokenContextType | undefined>(
  undefined
);

export default function AuthTokenContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<User | null>(null);
useEffect(() => {


  getUserData()
    .then((response) => {
      setData(response.data.user);
    })
    .catch(() => {
      localStorage.removeItem("userToken");
      setData(null);
    })
}, []);
      console.log(data)

  return (
    <tokenContext.Provider value={{ userData: data, setData }}>
      {children}
    </tokenContext.Provider>
  );
}