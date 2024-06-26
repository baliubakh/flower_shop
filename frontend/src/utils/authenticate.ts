import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";
import { RoleEnum } from "../types/user";

export interface IJwtPayload {
  sub: number;
  first_name: string;
  last_name: string;
  role: RoleEnum;
}

export const authenticate = (request: NextRequest) => {
  const authCookie = request.cookies.get("auth-cookie")?.value;

  if (authCookie) {
    const host = request.headers.get("host");
    const payload = jwtDecode<IJwtPayload>(authCookie);
    if (host) {
      const [, pathname] = request.url.split(host || "");
      if (pathname && pathname === "/admin" && payload.role !== "admin")
        return null;
    }
    return payload;
  }
  return null;
};
