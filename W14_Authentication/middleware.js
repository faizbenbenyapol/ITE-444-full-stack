//root project middleware.js
 
import { NextResponse } from "next/server";
 
export function middleware(request) {
  const cookie = request.cookies.get("session")?.value;
 
  let user = null;
  try {
    user = cookie ? JSON.parse(cookie) : null;
  } catch {
    user = null; // cookie ไม่ใช่ JSON ที่ถูกต้อง
  }
 
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
 
  if (user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url)); // login แล้วแต่ไม่ใช่ admin
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: ["/admin/:path*"],
};