import { AuthContext } from "@/components/auth-provider";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};
