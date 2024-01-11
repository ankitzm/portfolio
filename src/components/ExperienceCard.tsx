import React, { ReactNode } from 'react';
import Markdown from 'react-markdown';
import { useTransform, motion, MotionValue } from 'framer-motion';

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

interface LinkComponentProps {
    text?: string | ReactNode;
}

const tailwindColors = ['bg-purple-300', 'bg-orange-300', 'bg-blue-300', 'bg-red-300']

const ExperienceCard: React.FC<MyComponentProps> =
    ({ index, color, company, role, date, description, skills, progress, range, targetScale }) => {
    
        const scale = useTransform(progress, range, [1, targetScale])

        // custom anchor tag
        const LinkComponent: React.FC<LinkComponentProps> = ({ text, ...props }) => {
            return (
                <a target='_blank' className='underline font-semibold' {...props}>{text}</a>
            )
        }


        return (
            <motion.div
                className='min-h-screen flex items-center justify-center sticky'
                style={{
                    top: `calc(-10vh + ${index * 20}px)`,
                    scale
                }}
            >
                <div className={`flex flex-col justify-center relative p-4 sm:p-6 lg:p-8 rounded-2xl w-[95vh] sm:min-w-[600px] md:w-[750px] lg:w-[1000px] h-screen sm:h-[700px] md:h-[680px] text-xl border-8 border-black ${tailwindColors[index]} border-opacity-5`} >
                    <div className="gap-2 sm:gap-6">
                        <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            {company}
                        </h3>
                        <p className="mt-1 text-base sm:text-xl md:text-2xl font-medium text-gray-600">
                            ( {role} )
                        </p>
                    </div>

                    <ul className="list-disc text-base sm:text-xl text-gray-600 selection:mt-6 sm:mt-8">
                        {description.map((item, index) => {
                            return (
                                <li className='m-2 sm:m-4' key={index}>
                                    <Markdown components={{
                                        a(props) {
                                            return <LinkComponent text={props.children} {...props} />
                                        }
                                    }}>{item}</Markdown>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-4 sm:mt-10 gap-4 sm:gap-6">
                        <div className="font-bold text-gray-600">Worked With/On :</div>
                        <div>
                            {skills.map((tab, index) => {
                                return (
                                    <p key={index} className='bg-white bg-opacity-30 backdrop-blur-3xl m-1 sm:m-2 inline-block p-2 rounded-lg text-sm sm:text-xl'>{tab}</p>
                                )
                            })}
                        </div>
                    </div>

                    <div className="absolute top-6 sm:top-0 right-0 text-sm sm:text-xl bg-white bg-opacity-30 backdrop-blur-xl p-2 sm:p-6 text-gray-700 italic rounded-l-xl sm:rounded-tr-xl sm:rounded-bl-xl">
                        {date}
                    </div>
                </div>
            </motion.div>
        )
    }

export default ExperienceCard