"use client";
import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname.includes("/admin")) {
    console.log("middleware");
  }
  return NextResponse.next();
}
