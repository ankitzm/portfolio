import { useRef } from "react"
import { useInView, motion } from "framer-motion"

type AnimatedTextProps = {
    text: string,
    el?: keyof JSX.IntrinsicElements,
    className: string,
    once: boolean
}

export function AnimatedText({
    text,
    el: Wrapper = 'p',
    className,
    once,
}: AnimatedTextProps) {

    const ref = useRef(null)
    const inView = useInView(ref, { amount: 0.5, once })


    return <Wrapper className={className}>
        <span className="sr-only">{text}</span>

        <motion.span
            ref={ref}
            className="aria-hidden"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.1 }}
        >
            {text.split(' ').map((word) => (
                <span className="inline-block">
                    {
                        word.split('').map((ch) => (
                            <motion.span
                                variants={defaultAnimation}
                                className="inline-block"
                            >
                                {ch}
                            </motion.span>
                        ))
                    }

                    {/* space */}
                    <span>&nbsp;</span>
                </span>
            ))}

        </motion.span>

    </Wrapper>
}

const defaultAnimation = {
    hidden: {
        opacity: 0,
        y: 50,
        rotate: "20deg"
    },
    visible: {
        opacity: 1,

        y: 0,
        transition: {
            duration: 1
        },
        // Animation: {},
        rotate: "0deg"
    }
}