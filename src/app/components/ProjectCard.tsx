import React from 'react'
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface ProjectCardProps {
    imgUrl: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl: string;
    timeline: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imgUrl, title, description, gitUrl, previewUrl, timeline }) => {
    return (
        <div>
            <div className='h-52 md:h-72 rounded-t-xl relative group'
                style={{ background: `url(${imgUrl})`, backgroundSize: 'cover' }}>
                <div className='overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[--rbackground] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500'>
                    <Link href={gitUrl} className='h-14 w-14 mr-2 border-2 relative rounded-full border-[--secondary] hover:border-[--primary] group/link'>
                        <CodeBracketIcon className='h-10 w-10 text-[--secondary] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-[--primary]' />
                    </Link>
                    <Link href={previewUrl} className='h-14 w-14 border-2 relative rounded-full border-[--secondary] hover:border-[--primary] group/link'>
                        <EyeIcon className='h-10 w-10 text-[--secondary] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-[--primary]' />
                    </Link>
                </div>
            </div>
            <div className="text-[--primary] rounded-b-xl mt-3 bg-[--rbackground] py-6 px-4 min-h-[200px]">
                <h5 className='text-xl font-semibold mb-2'>{title}</h5>
                <p className='text-[--secondary] font-bold mb-2'>{timeline}</p>
                <p className='text-[--secondary] '>{description}</p>
            </div>
        </div>
    )
}

export default ProjectCard
