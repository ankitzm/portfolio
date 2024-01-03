import Markdown from 'react-markdown';
import { useTransform, motion, MotionValue } from 'framer-motion';

import tailwindColors from 'tailwindcss/colors';

interface MyComponentProps {
    index: number;
    color: string;
    company: string;
    role: string;
    date: string;
    description: Array<string>;
    skills: Array<string>;
    progress: MotionValue<number>;
    range: Array<number>;
    targetScale: number;
}

const ExperienceCard: React.FC<MyComponentProps> =
    ({ index, color, company, role, date, description, skills, progress, range, targetScale }) => {
        // Tailwind Color List
        // console.log(Object.keys(tailwindColors));

        const backgroundColor = Object.keys(tailwindColors).includes(color.toLocaleLowerCase()) ? `bg-${color}-400` : 'bg-slate-400'

        const scale = useTransform(progress, range, [1, targetScale])

        // opens link in new tab + underline & bold the links
        const LinkRenderer: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
            href,
            children,
        }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
                <strong><u>{children}</u></strong>
            </a>
        );

        const linkComponents = {
            a: LinkRenderer,
        };

        return (
            <motion.div
                className='min-h-screen flex items-center justify-center sticky sm:mb-20'
                style={{
                    top: `calc(-10vh + ${index * 20}px)`,
                    scale
                }}
            >
                <div className={`flex flex-col justify-center relative p-4 sm:p-6 lg:p-8 rounded-2xl w-[95vh] sm:min-w-[600px] md:w-[750px] lg:w-[1000px] h-screen sm:min-h-[600px] md:h-[550px] text-xl border-8 border-black border-opacity-5 ${backgroundColor} bg-opacity-[95]`} >
                    <div className="gap-2 sm:gap-6">
                        <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            {company}
                        </h3>
                        <p className="mt-1 text-base sm:text-xl md:text-2xl font-medium text-gray-600">
                            ( {role} )
                        </p>
                    </div>

                    <ul className="list-disc text-base sm:text-xl text-gray-600 selection:mt-6 sm:mt-8">
                        {description.map((item: string | null | undefined) => {
                            return (
                                <li className='m-4'>
                                    <Markdown components={linkComponents}>{item}</Markdown>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-10 gap-4 sm:gap-6">
                        <div className="font-bold text-gray-600">Worked With/On :</div>
                        <div>
                            {skills.map((tab: string) => {
                                return (
                                    <p className='bg-white bg-opacity-30 backdrop-blur-3xl m-2 inline-block p-2 rounded-lg text-base sm:text-xl'>{tab}</p>
                                )
                            })}
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 bg-white bg-opacity-30 backdrop-blur-xl p-4 sm-p-6 text-gray-700 italic rounded-tr-xl rounded-bl-xl">
                        {date}
                    </div>
                </div>
            </motion.div>
        )
    }

export default ExperienceCard