/** Entry in `public/data/projects.json`. */
export type Project = {
  name: string;
  title: string;
  description: string;
  /** Screenshot basename under `public/projects/`, no extension. */
  image: string;
  /** `website` is an empty string for projects that were never deployed. */
  links: { github: string; website: string };
  tags: string[];
};

/** Entry in `public/data/experience.json`. */
export type Experience = {
  color: string;
  /** Empty on the freelance entry, where `role` carries the name. */
  company: string;
  role: string;
  date: string;
  /** Bullets; may contain `[label](href)` markdown links. */
  description: string[];
  skills: string[];
};

/** Entry in `public/data/posts.json`. */
export type Post = {
  title: string;
  /** Display date, e.g. "12 MAR '26". */
  date: string;
  /** External article URL (Medium etc.). */
  url: string;
  minutes: number;
};
