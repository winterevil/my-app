import React from 'react'

interface ProjectTagProps {
    name: string;
    onClick: (name: string) => void;
    isSelected: boolean;
}

const ProjectTag: React.FC<ProjectTagProps> = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected
        ? "text-[--primary] border-primary-500"
        : "text-[--secondary] border-slate-600 hover:border-[--primary]";
        
    return (
        <button 
            className={`${buttonStyles} rounded-full border-2 hover:border-[--primary] px-6 py-3 text-xl cursor-pointer`} 
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    )
}

export default ProjectTag
