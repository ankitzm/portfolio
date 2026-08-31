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
