import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const response = NextResponse.next();

  if (url.pathname === "/") {
    url.pathname = "/editor";
    return NextResponse.rewrite(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|assets/|images/|icon.png|.*\\.(?:png|jpe?g|gif|svg|ico|js|css|scss)).*)",
  ],
};
