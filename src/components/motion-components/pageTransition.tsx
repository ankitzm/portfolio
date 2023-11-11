import React from "react"
import { motion } from "framer-motion"
// import React from "react"
// import { JSX } from "react/jsx-runtime"

const transition = (TheComponent: React.FunctionComponent) => {
    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-blue-400 origin-bottom z-50"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1, scaleX: 1 }}
                transition={{ duration: 1, ease: [0.1, 0.5, 0.3, 1] }}
            />
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-blue-400 origin-top z-50"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.1, 0.5, 0.3, 1] }}
            />
            <TheComponent />
        </>
    )
}

export default transition