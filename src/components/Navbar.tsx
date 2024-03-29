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

    const activeClass = 'bg-opacity-100'

    return (
        <div className="z-50 fixed flex flex-wrap md:flex-col font-medium sm:font-semibold text-sm sm:text-lg lg:text-xl pt-4 pl-1 sm:pt-4 sm:pl-8">
            {
                navButtons.map((item, index) =>
                    <Link key={index} to={item.page.toLowerCase()} className="w-fit">
                        <span key={index} className={`flex items-center gap-2 w-fit rounded-md py-1 px-3 sm:py-2 sm:px-4 m-1 sm:m-2 ${currentPath == item.page ? activeClass : "bg-opacity-75"} bg-slate-200 border-2 border-dotted border-neutral-800 backdrop-blur-xl`}>
                            {<item.icon />} {item.name.toLowerCase()}
                        </span>
                    </Link>
                )
            }


        </div>
    )
}

export default Navbar