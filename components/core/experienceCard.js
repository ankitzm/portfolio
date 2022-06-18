import React from 'react';
import Image from 'next/image';
import { marked } from 'marked';

function experienceCard({ name, duration, description, role }) {
    return (
        <div className="flex flex-col justify-center w-full max-w-4xl p-4 bg-slate-400 bg-opacity-20 rounded-2xl">
            <div className='flex justify-between'>
                <h5 className="text-gray-900 sm:text-xl md:text-2xl font-bold mb-2">{name}
                    <div className="text-gray-700 text-base sm:text-lg md:text-xl mb-1">
                        ({role})
                    </div></h5>
                <p className="text-gray-700 text-xs sm:text-base mb-4 italic">
                    {duration}
                </p>
            </div>
            <div className="text-gray-700 text-lg mb-4">
                {description.map(item => {
                    return (
                        <ul key={item} className="list-disc ml-4 sm:ml-10">
                            <li className='m-2'>
                                {marked.lexer(item)[0].tokens.map(item => (
                                    item.type === 'link' ?
                                        <strong> <a href={item.href} target="_blank" rel="noreferrer">{item.text}</a> </strong>
                                        : item.text
                                ))}
                            </li>
                        </ul>
                    )
                })}
            </div>
        </div>
    );
}

export default experienceCard;
