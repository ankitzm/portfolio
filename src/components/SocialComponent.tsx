import { FaGithub, FaTwitter, FaLinkedin, FaBlogger } from "react-icons/fa";

function SocialComponent() {
    const iconSize: number = window.innerWidth > 425 ? 35 : 25

    return (
        <div className="absolute bg-neutral-950 flex bottom-10 sm:bottom-20 rounded-lg gap-3 p-3">
            <a href="https://twitter.com/ankitzm"
                target="_blank" rel='noreferrer'
                className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
            >
                <FaGithub size={iconSize} />
            </a>
            <a href="https://www.linkedin.com/in/ankitzm"
                target="_blank" rel='noreferrer'
                className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
            >
                <FaLinkedin size={iconSize} />
            </a>
            <a href="https://github.com/ankitzm"
                target="_blank" rel='noreferrer'
                className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
            >
                <FaTwitter size={iconSize} />
            </a>
            <a href="https://hashnode.com/@ankitzm"
                target="_blank" rel='noreferrer'
                className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
            >
                <FaBlogger size={iconSize} />
            </a>
        </div>
    )
}

export default SocialComponent