import { SiNextdotjs, SiTailwindcss, SiWeb3Dotjs } from "react-icons/si";
import { FaEthereum, FaLinux, FaNodeJs, FaReact } from "react-icons/fa";


function MyTools() {
    const iconSize: number = window.innerWidth > 425 ? 30 : 25

    const topTools = [
        {
            name: "ReactJS",
            icon: FaReact,
        },
        {
            name: "NextJS",
            icon: SiNextdotjs,
        },
        {
            name: "Ethereum",
            icon: FaEthereum,
        },
        {
            name: "TailwindCSS",
            icon: SiTailwindcss,
        },
        {
            name: "web3JS",
            icon: SiWeb3Dotjs,
        },
        {
            name: "NodeJS",
            icon: FaNodeJs,
        },
        {
            name: "Linux",
            icon: FaLinux,
        }
    ]
    const tools = [
        {
            heading: 'Programming language',
            tool: ['javascript', 'typescript', 'c++', 'html & css',],
        },
        {
            heading: 'Frameworks/Libraries',
            tool: ['Reactjs', 'Nextjs', 'TailwindCSS', 'ExpresJS', 'Chakra UI', 'Hardhat', 'wagmi.sh(ethereum)'],
        },
        {
            heading: 'Platforms',
            tool: ['Gihub', 'Vercel', 'SupaBase', 'Deta', 'Medusa', 'Google Cloud'],
        },
        {
            heading: 'Others',
            tool: ['git', 'UI Prototyping(Figma)', 'cli tooling', 'EVM', 'Chrome Extension'],
        }
    ]

    return (
        <div className="min-h-screen flex flex-col items-center w-full px-40 gap-6 pt-10 font-semibold bg-pastelOrange text-neutral-800">
            <span className="text-xl sm:text-2xl md:text-4xl w-max font-poppins">
                Technologies I mostly work with :
            </span>
            <span className="flex gap-3 sm:gap-6">
                {
                    topTools.map((item, index) => {
                        return (
                            <p key={index} className='bg-white backdrop-blur-md bg-opacity-30 p-2 sm:p-4 rounded-xl sm:rounded-3xl'>
                                <item.icon size={iconSize} className="text-neutral-900" />
                            </p>
                        )
                    }
                    )
                }
            </span>

            <div className="my-6 grid w-max sm:grid-cols-2 gap-4 flex-wrap">
                {
                    tools.map((items, index) => {
                        return (
                            <div key={index} className="border border-dashed border-neutral-800 w-auto rounded-xl p-4 pattern-bank-note-neutral-800/5">
                                <span className="text-lg sm:text-2xl">{items.heading}</span>
                                <ul className="text-base md:text-lg text-opacity-80">
                                    {
                                        items.tool.map(i => {
                                            return (
                                                <li>{i}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default MyTools