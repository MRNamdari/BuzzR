import { NextRequest, NextResponse } from "next/server";
import { locale } from "./db/schema/system/settings";
import { db } from "./db/client";
import { fromPromise } from "neverthrow";

const DEFAULT_LOCALE = { id: 1, code: "fa", name: "فارسی" };
const locales = await fromPromise(db.select().from(locale), (e) =>
  console.error(e),
).match(
  (d) => d,
  () => [DEFAULT_LOCALE],
);
const MOBILE_UA_RE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB10|IEMobile|Opera Mini|Mobi/i;
const OVERRIDE_DEVICE = "device";
const OVERRIDE_LOCALE = "locale";
const DEFAULT_LANG = DEFAULT_LOCALE.code;
const LANG_RE = /^[a-z]{2}(?:-[A-Z]{2})?$/;

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  return request.cookies.get(OVERRIDE_LOCALE)?.value ?? DEFAULT_LOCALE.code;
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  // Skip API, Next internals, public and common static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/_vercel") // optional
  ) {
    return;
  }

  if (/\.[^/]+$/.test(pathname) || /^\/(api|videos)/.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  const cookie = request.cookies.get(OVERRIDE_DEVICE);
  let preferMobile: boolean | null = null;
  if (cookie?.value === "mobile") preferMobile = true;
  if (cookie?.value === "desktop") preferMobile = false;

  // If no override, detect from UA
  if (preferMobile === null) {
    const ua = request.headers.get("user-agent") ?? "";
    preferMobile = MOBILE_UA_RE.test(ua);
  }

  // Use internal-only prefixes so the browser URL remains unchanged
  const internalPrefix = preferMobile ? "/mobile" : "/desktop";
  const url = request.nextUrl.clone();
  let rest = pathname;

  if (!rest.startsWith("/")) rest = "/" + rest;

  if (pathnameHasLocale) {
    url.pathname = `${internalPrefix}${rest}`;
  } else {
    // Determine language segment and rest of path
    const lang = getLocale(request) ?? DEFAULT_LANG;
    url.pathname = `${internalPrefix}/${lang}${rest}`;
  }

  console.log({
    // preferMobile,
    // internalPrefix,
    pathname: url.pathname,
  });
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|public).*)",
    // Optional: only run on root (/) URL
    "/((?!_next/static|_next/image|.*\\.[^/]+$).*)",
  ],
};
