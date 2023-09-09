import { Link, useLocation } from "react-router-dom"

function Navbar() {

    const navButtons = [
        {
            'name': "Home",
            "page": "/",
        },
        {
            'name': "Projects",
            "page": "/projects",
        },
        {
            'name': "Expereince",
            "page": "/experience",
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
                        <li key={e.name} className={`bg-indigo-400 py-2 px-4 m-2 rounded-md w-fit ${currentPath == e.page ? activeClass : ""}`}>
                            {e.name}
                        </li>
                    </Link>
                )
            }
        </ul>
    )
}

export default Navbar