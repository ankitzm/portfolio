import { FaGithub, FaTwitter, FaLinkedin, FaBlogger } from "react-icons/fa";

function SocialComponent() {
    const iconSize: number = window.innerWidth > 425 ? (window.innerWidth > 768 ? 30 : 22) : 18

    return (
        <div className="absolute bg-neutral-900 grid top-16 lg:top-auto right-0 rounded-l-lg gap-2 sm:gap-3 p-2 sm:p-3">
            <div className="grid gap-2 sm:gap-3">
                <a href="https://github.com/ankitzm"
                    target="_blank" rel='noreferrer'
                    className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
                >
                    <FaGithub size={iconSize} />
                </a>
                <a href="https://twitter.com/ankitzm"
                    target="_blank" rel='noreferrer'
                    className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
                >
                    <FaTwitter size={iconSize} />
                </a>
            </div>
            <div className="gap-2 sm:gap-3 hidden sm:grid">
                <a href="https://www.linkedin.com/in/ankitzm"
                    target="_blank" rel='noreferrer'
                    className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
                >
                    <FaLinkedin size={iconSize} />
                </a>
                <a href="https://hashnode.com/@ankitzm"
                    target="_blank" rel='noreferrer'
                    className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
                >
                    <FaBlogger size={iconSize} />
                </a>
            </div>
        </div>
    )
}

export default SocialComponent