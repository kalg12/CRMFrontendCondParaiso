"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { UserProvider } from "./context/UserContext";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <UserProvider>
        <AnimatedCursor />
        <Navbar />
        <Hero />
        <Footer />
      </UserProvider>
    </>
  );
}
