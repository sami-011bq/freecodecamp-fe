"use client";

import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { createContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  avatar?: string;
} | null;

type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const AuthContext = createContext<ContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await http().get(endpoints.auth.profile);

        if (data) {
          setUser({
            name: data.name,
            email: data.email,
            avatar: data.avatar || "",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {isLoading ? <div /> : children}
    </AuthContext.Provider>
  );
}
