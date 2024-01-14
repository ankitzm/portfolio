import { ImGithub } from "react-icons/im";
import { BiLinkExternal } from "react-icons/bi";

interface ItemProps {
    name: string;
    projectImage: string;
    links: { github: string, website: string };
    description: string;
    tags: Array<string>
}

interface ImgProps {
    src: string;
    fallback: string;
    className: string;
    type: string;
    alt: string;
}

const ImgWithFallback = ({
    src,
    fallback,
    className,
    type,
    alt,
    ...delegated
}: ImgProps) => {
    return (
        <picture>
            <source srcSet={src} type={type} className={className} />
            <img src={fallback} {...delegated} className={className} alt={alt} loading="lazy" />
        </picture>
    );
};

export function ProjectCard(props: ItemProps) {

    return (
        <div className="rounded-2xl w-80 md:w-96 lg:w-128 h-fit sm:h-min p-2 isolate bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-black/5">
            <ImgWithFallback
                src={`projects/webp/${props.projectImage}.webp`}
                fallback={`projects/png/${props.projectImage}.png`}
                className="w-full aspect-video rounded-2xl"
                alt="project image"
                type="image/webp"
            />
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