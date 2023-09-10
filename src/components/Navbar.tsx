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
        <ul>
            {
                navButtons.map(e =>
                    <Link to={e.page.toLowerCase()}>
                        <li key={e.name} className={`flex items-center gap-2 bg-indigo-400 py-2 px-4 m-2 rounded-md w-fit text-lg ${currentPath == e.page ? activeClass : ""} `}>
                            {<e.icon />} {e.name.toLowerCase()}
                        </li>
                    </Link>
                )
            }
        </ul>
    )
}

export default Navbar