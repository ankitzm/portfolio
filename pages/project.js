import React from 'react';
import ProjectCard from '../components/core/projectCard';
import Data from "./../data/data.json"

function project() {
    const projectList = Data.project

    return (
        <div className='flex flex-wrap gap-8 lg:gap-20 lg:mx-10 justify-center'>
            {
                projectList.map(project => {
                    return <ProjectCard name={project.name} description={project.description} link={project.link} key={project.name} />
                })
            }
        </div>
    );
} 4

export default project;
