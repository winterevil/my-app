"use client"
import React, { useState, useRef } from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import { motion, useInView } from 'framer-motion'


const projectsData = [
    {
        id: 1,
        title: 'Cosmetic E-Commerce Website',
        description: 'This cosmetic e-commerce website allows users to browse and purchase beauty products online. Moreover, admins can add, edit, and delete products or blogs.',
        imgUrl: '/images/projects/2.png',
        tag: ["All", "Web"],
        gitUrl: "https://github.com/winterevil/CSE311",
        previewUrl: "/",
        timeline: "Sep 2024 - Dec 2024"
    },
    {
        id: 2,
        title: 'Umbrella Hospital',
        description: "The objective of the project is to facilitate remote monitoring of patients, enabling healthcare providers to track and manage patients' health.",
        imgUrl: '/images/projects/3.png',
        tag: ["All", "Desktop"],
        gitUrl: "https://github.com/winterevil/P04SoftwareEngineering",
        previewUrl: "/",
        timeline: "Apr 2024 - Jun 2024"
    },
    {
        id: 3,
        title: 'Restaurant Management System',
        description: 'This website is designed for restaurant management, allowing customers to view menus and place orders directly while managing menu items and tracking orders.',
        imgUrl: '/images/projects/1.png',
        tag: ["All", "Web"],
        gitUrl: "https://github.com/winterevil/CSE310-RMS",
        previewUrl: "/",
        timeline: "Jan 2024 - Apr 2024"
    },
    {
        id: 4,
        title: "LYTH Library Assistant",
        description: "This application allows users to search for books, view book details, borrow books, return book, and allow admin to add, edit, and delete books and borrowers.",
        imgUrl: '/images/projects/4.png',
        tag: ["All", "Desktop"],
        gitUrl: "https://github.com/winterevil/BookProject",
        previewUrl: "/",
        timeline: "Apr 2023 - Jun 2023"
    }
]
const ProjectsSection = () => {
    const [tag, setTag] = useState("All")
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const handleTagChange = (newTag: string) => setTag(newTag)
    const filteredProjects = projectsData.filter((project) => project.tag.includes(tag))
    const cardVarriants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    }

    return (
        <section id="projects">
            <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12'>
                My Projects
            </h2>
            <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
                <ProjectTag onClick={handleTagChange}
                    name="All"
                    isSelected={tag === "All"}>
                </ProjectTag>
                <ProjectTag onClick={handleTagChange}
                    name="Web"
                    isSelected={tag === "Web"}>
                </ProjectTag>
                <ProjectTag onClick={handleTagChange}
                    name="Desktop"
                    isSelected={tag === "Desktop"}>
                </ProjectTag>
            </div>
            <ul ref={ref} className='grid md:grid-cols-3 gap-8 md:gap-12'>
                {filteredProjects.map((project, index) => (
                    <motion.li key={index} variants={cardVarriants} initial="initial" animate={isInView ? "animate" : "initial"}
                        transition={{ duration: 0.5, delay: index * 0.4 }}
                    >
                        <ProjectCard key={project.id}
                            title={project.title}
                            description={project.description}
                            imgUrl={project.imgUrl}
                            gitUrl={project.gitUrl}
                            previewUrl={project.previewUrl}
                            timeline={project.timeline} />
                    </motion.li>
                ))}
            </ul>
        </section>
    )
}

export default ProjectsSection
