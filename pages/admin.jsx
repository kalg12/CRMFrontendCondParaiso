import React from "react";
import Admin from "./dashboard/Admin";
import ThemeProvider from "@/app/utils/ThemeContext";
import { UserProvider } from "@/app/context/UserContext";

const admin = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Admin />
      </UserProvider>
    </ThemeProvider>
  );
};

export default admin;
