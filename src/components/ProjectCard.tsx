import { ImGithub } from "react-icons/im";
import { BiLinkExternal } from "react-icons/bi";

interface ItemProps {
    name: string;
    projectImage: string;
    links: { github: string, website: string };
    description: string;
    tags: Array<string>
}

export function ProjectCard(props: ItemProps) {

    return (
        <div className="rounded-2xl w-80 md:w-96 lg:w-128 h-128 sm:h-min p-2 isolate bg-white/20 backdrop-blur-lg shadow-xl ring-1 ring-black/5">
            <img className="w-full aspect-video rounded-2xl" src={`projects/${props.projectImage}`} alt="project image" loading="lazy" />
            <div className="px-6 py-4 text-xl md:text-2xl">
                <div className="font-bold mb-2 flex justify-between">
                    <span>{props.name}</span>
                    <span className="flex gap-4 opacity-70">
                        <a href={props.links.github} target="_blank">
                            <ImGithub />
                        </a>
                        <a href={props.links.website} target="_blank">
                            <BiLinkExternal />
                        </a>
                    </span>
                </div>
                <p className="text-base md:text-xl text-opacity-90">
                    {props.description}
                </p>
                <div className="pt-4 pb-2">
                    {props.tags.map((e: string) => (
                        <span key={e} className="inline-block bg-white bg-opacity-20 backdrop-blur-md rounded-md px-3 py-1 text-sm font-semibold text-opacity-80 mr-2 mt-2">{e}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}