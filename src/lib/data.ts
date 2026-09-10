import "server-only";

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Experience, Post, Project } from "@/types";

async function read<T>(file: string): Promise<T> {
  const full = path.join(process.cwd(), "public", "data", file);
  return JSON.parse(await readFile(full, "utf8")) as T;
}

export const getProjects = () => read<Project[]>("projects.json");
export const getExperience = () => read<Experience[]>("experience.json");

/** Screenshot path for a project's `image` basename. */
export const projectImage = (image: string) => `/projects/webp/${image}.webp`;

/** Live site when there is one, else the repo. */
export const projectHref = ({ links }: Project) =>
  links.website || links.github;
export const getPosts = () => read<Post[]>("posts.json");

/** True once a portrait has been dropped at public/portrait.jpg. */
export const hasPortrait = () =>
  existsSync(path.join(process.cwd(), "public", "portrait.jpg"));
