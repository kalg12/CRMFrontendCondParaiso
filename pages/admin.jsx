import React from "react";
import Admin from "./dashboard/Admin";
import ThemeProvider from "@/app/utils/ThemeContext";

const admin = () => {
  return (
    <ThemeProvider>
      <Admin />
    </ThemeProvider>
  );
};

export default admin;
