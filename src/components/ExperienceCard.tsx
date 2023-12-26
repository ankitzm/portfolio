import { useTransform, motion } from 'framer-motion';

function ExperienceCard({ index, name, color, progress, range, targetScale }) {

    const colorClasses = {
        red: 'bg-red-400',
        blue: 'bg-blue-400',
        green: 'bg-green-400',
        violet: 'bg-violet-400',
        slate: 'bg-slate-400'
        // Add more colors as needed ...
    };
    const backgroundColor = colorClasses[color] || 'bg-gray-200';

    const scale = useTransform(progress, range, [1, targetScale])

    return (
        <motion.div
            className='h-screen flex items-center justify-center sticky'
            style={{
                top: `calc(-10% + ${index * 20}px)`,
                scale
            }}
        >
            <div className={`grid place-items-center rounded-2xl h-[500px] w-[1000px] m-4 font-bold text-3xl ${backgroundColor}`}>
                {name}
            </div>
        </motion.div>
    )
}

export default ExperienceCard