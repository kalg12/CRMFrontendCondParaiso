import React from "react";
import LayoutAdmin from "./dashboard/LayoutAdmin";
import ThemeProvider from "@/app/utils/ThemeContext";
import { UserProvider } from "@/app/context/UserContext";

const admin = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <LayoutAdmin />
      </UserProvider>
    </ThemeProvider>
  );
};

export default admin;
