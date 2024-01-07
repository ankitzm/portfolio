import React from "react"
import { motion, easeIn, easeOut } from "framer-motion"
// import React from "react"
// import { JSX } from "react/jsx-runtime"

const transition = (TheComponent: React.FunctionComponent) => {
    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-pastelOrange origin-bottom z-50"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1, scaleX: 1 }}
                transition={{ duration: 1, ease: easeIn }}
            />
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-pastelOrange origin-top z-50"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: easeOut }}
            />
            <TheComponent />
        </>
    )
}

export default transition