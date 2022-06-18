import React from 'react';
import ExperienceCard from '../components/core/experienceCard';
import Data from "./../data/data.json"

function experince() {
    const experienceList = Data.experience
    return (
        <div className='flex flex-col items-center justify-center w-full gap-4'>
            {
                experienceList.map(experience => {
                    return <ExperienceCard name={experience.title} role={experience.role} description={experience.description} duration={experience.duration} key={experience.title + experience.role} />
                })
            }
        </div>
    );
}

export default experince;
