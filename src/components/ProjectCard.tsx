// import { useState } from "react";
// import ProjectImages from "../assets/projects/projectAssets";

interface ItemProps {
    name: string;
    projectImage: string;
    description: string;
    tags: Array<string>
    animation: string
}

export function ProjectCard(props: ItemProps) {

    return (
        <div className="rounded-2xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] shadow-purple-400 drop-shadow-lg w-80 md:w-96 lg:w-128 h-128 sm:h-min p-1 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700" data-aos={props.animation}>
            <img className="w-full aspect-video rounded-t-2xl" src={props.projectImage} alt="Sunset in the mountains" loading="lazy" />
            <div className="px-6 py-4 bg-opacity-20 bg-white backdrop-blur-3xl rounded-b-2xl text-black text-2xl">
                <div className="font-bold mb-2">{props.name}</div>
                <p className="text-gray-700 text-xl">
                    {props.description}
                </p>
                <div className="pt-4 pb-2">
                    {props.tags.map((e: string) => (
                        <span className="inline-block bg-gray-400 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e}</span>
                    ))}
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">tech</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">web3</span>
                </div>


            </div>
        </div >

    )
}