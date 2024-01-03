import { Link, useLocation } from "react-router-dom"
import { HiHome } from "react-icons/hi"
import { GrTools } from "react-icons/gr"
import { PiToolboxDuotone } from "react-icons/pi"


function Navbar() {

    const navButtons = [
        {
            'name': "Home",
            "page": "/",
            "icon": HiHome
        },
        {
            'name': "Projects",
            "page": "/projects",
            "icon": GrTools
        },
        {
            'name': "Expereince",
            "page": "/experience",
            "icon": PiToolboxDuotone
        }
    ]

    const currentPath = useLocation().pathname
    console.log(currentPath);


    const activeClass = 'bg-purple-400'

    return (
        <ul className="z-50 fixed">
            {
                navButtons.map((item, index) =>
                    <Link key={index} to={item.page.toLowerCase()}>
                        <li key={index} className={`flex items-center gap-2 bg-indigo-400 rounded-md w-fit text-base sm:text-lg py-2 px-4 m-2 ${currentPath == item.page ? activeClass : ""} `}>
                            {<item.icon />} {item.name.toLowerCase()}
                        </li>
                    </Link>
                )
            }
        </ul>
    )
}

export default Navbar