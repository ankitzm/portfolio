/** Nav, socials and shared asset paths. No server-only imports — client-safe. */

/** The one portrait source. Hero and passport must not drift apart again. */
export const PORTRAIT = "/portrait.jpeg";

export const nav = [
  /** The customs menu prefixes the live project count. */
  { href: "/projects", label: "Projects", note: "items to declare" },
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
    href: "https://medium.com/@ankitzm",
    label: "Medium",
    handle: "MEDIUM/@ANKITZM",
  },
  {
    href: "https://www.linkedin.com/in/ankitzm",
    label: "LinkedIn",
    handle: "LINKEDIN/ANKITZM",
  },
] as const;
