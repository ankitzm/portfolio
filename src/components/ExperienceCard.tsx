import Markdown from 'react-markdown';
import { useTransform, motion } from 'framer-motion';

interface MyComponentProps {
    index: number;
    color: string;
    company: string;
    role: string;
    date: string;
    description: string;
    skills: Array<string>;
    progress: unknown;
    range: Array<number>;
    targetScale: number;
}

const ExperienceCard: React.FC<MyComponentProps> =
    ({ index, color, company, role, date, description, skills, progress, range, targetScale }) => {

        const colorClasses = {
            red: 'bg-red-400',
            blue: 'bg-blue-400',
            green: `bg-green-400`,
            violet: 'bg-violet-400',
            purple: 'bg-purple-400',
            slate: 'bg-slate-400'
            // Add more colors as needed ...
        };
        const backgroundColor = colorClasses[color] || 'bg-gray-300';

        const scale = useTransform(progress, range, [1, targetScale])

        // opens link in new tab + underline & bold them
        const LinkRenderer: React.FC<{ href: string }> = ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
                <strong><u>{children}</u></strong>
            </a>
        );

        const linkComponents = {
            a: LinkRenderer,
        };

        return (
            <motion.div
                className='h-screen flex items-center justify-center sticky'
                style={{
                    top: `calc(-10vh + ${index * 20}px)`,
                    scale
                }}
            >
                <div className={`relative block overflow-hidden p-4 sm:p-6 lg:p-8 rounded-2xl w-[95vh] sm:w-[600px] md:w-[750px] lg:w-[1000px] h-screen sm:h-[550px] text-xl border-8 border-black border-opacity-5 ${backgroundColor} bg-opacity-80 backdrop-blur-xl`} >
                    <div className="gap-2 sm:gap-6">
                        <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            {company}
                        </h3>
                        <p className="mt-1 text-base sm:text-xl md:text-2xl font-medium text-gray-600">
                            ( {role} )
                        </p>
                    </div>

                    <ul className="list-disc text-base sm:text-xl w-[90%] text-gray-600 selection:mt-6 sm:mt-8">
                        {description.map((item: string | null | undefined) => {
                            return (
                                <li className='m-4'>
                                    <Markdown components={linkComponents}>{item}</Markdown>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-14 gap-4 sm:gap-6">
                        <div className="font-bold text-gray-600">Worked With :</div>
                        <div>
                            {skills.map((tab: string) => {
                                return (
                                    <p className='bg-white bg-opacity-30 backdrop-blur-3xl m-2 inline-block p-2 rounded-lg'>{tab}</p>
                                )
                            })}
                        </div>
                    </div>

                    <div className="absolute bottom-0 right-20 bg-white bg-opacity-30 backdrop-blur-xl p-4 sm-p-6 text-gray-700 italic rounded-t-xl">
                        {date}
                    </div>
                </div>
            </motion.div>
        )
    }

export default ExperienceCard