/** Nav, socials and shared asset paths. No server-only imports — client-safe. */

/** The one portrait source. Hero and passport must not drift apart again. */
export const PORTRAIT = "/portrait.jpeg";

export const nav = [
  { href: "/projects", label: "Projects", note: "14 items to declare" },
  { href: "/experience", label: "Experience", note: "passport on file" },
  { href: "/#booking", label: "Let's talk", note: "postage paid" },
] as const;

export const socials = [
  {
    href: "https://github.com/ankitzm",
    label: "GitHub",
    handle: "GITHUB/ANKITZM",
  },
  { href: "https://x.com/ankitzm", label: "X", handle: "X @ANKITZM" },
  {
    href: "https://medium.com/@0xblocktrain",
    label: "Medium",
    handle: "MEDIUM/@0XBLOCKTRAIN",
  },
] as const;
