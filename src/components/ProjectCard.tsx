import { useState } from "react";
import ProjectImages from "../assets/projects/projectAssets";

interface ItemProps {
    name: string;
    projectImage: string;
    description: string;
    tags: Array<string>
    animation: string
}

export function ProjectCard(props: ItemProps) {

    return (
        <div className="rounded-2xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] shadow-purple-400 drop-shadow-lg w-80 md:w-96 lg:w-128 h-128 sm:h-min p-1 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700" onClick={() => (showModal == false ? setShowModal(true) : null)} data-aos={props.animation}>
            <img className="w-full aspect-video rounded-t-2xl" src={`./../assets/projects/${props.projectImage}`} alt="Sunset in the mountains" loading="lazy" />
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

                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none border-2 border-purple-500" >
                            <div className="relative h-9/10 w-11/12">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {props.name}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                            I always felt like I could do anything. That’s the main
                                            thing people are controlled by! Thoughts- their perception
                                            of themselves! They're slowed down by their perception of
                                            themselves. If you're taught you can’t do anything, you
                                            won’t do anything. I was taught I could do everything.
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        </div >

    )
}