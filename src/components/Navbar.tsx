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
    // console.log(currentPath);

    const activeClass = 'bg-opacity-95'

    return (
        <ul className="z-50 fixed flex sm:flex-col font-medium">
            {
                navButtons.map((item, index) =>
                    <Link key={index} to={item.page.toLowerCase()}>
                        <li key={index} className={`flex items-center gap-2 rounded-md w-fit text-base sm:text-lg py-1 px-3 sm:py-2 sm:px-4 m-2 ${currentPath == item.page ? activeClass : "bg-opacity-75"} bg-slate-200 border-2 border-dotted border-neutral-800 backdrop-blur-xl`}>
                            {<item.icon />} {item.name.toLowerCase()}
                        </li>
                    </Link>
                )
            }

            
        </ul>
    )
}

export default Navbar