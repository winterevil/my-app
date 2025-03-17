"use client"
import React, { useTransition, useState } from 'react'
import Image from "next/image"
import TabButton from './TabButton'

const TAB_DATA = [
  {
    id: 'skills',
    title: 'Skills',
    content: (
      <div className='grid md:grid-cols-6 grid-cols-3 pl-2 gap-4'>
        {[
          { src: "/images/about/nextjs.png", name: "Next.js" },
          { src: "/images/about/nodejs.png", name: "Node.js" },
          { src: "/images/about/react.png", name: "React.js" },
          { src: "/images/about/mysql.png", name: "MySQL" },
          { src: "/images/about/java.png", name: "Java" },
          { src: "/images/about/csharp.png", name: "C#" },
          { src: "/images/about/html.png", name: "HTML" },
          { src: "/images/about/css.png", name: "CSS" },
          { src: "/images/about/js.png", name: "JavaScript" },
          { src: "/images/about/tailwindcss.png", name: "Tailwind CSS" },
        ].map((skill, index) => (
          <div key={index} className="relative group flex justify-center items-center">
            <Image className='mb-4' src={skill.src} width={50} height={50} alt={skill.name} />
            <span className="absolute top-6 left-3/4 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'education',
    title: 'Education',
    content: (
      <div className='grid md:grid-cols-3 grid-cols-2 pl-2'>
        <p className='mb-4'>
          <Image className='mb-3' src="/images/about/eiu.png" width={50} height={50} alt="education"></Image>
          <span className='text-[--primary]'>Eastern International University</span>
        </p>
      </div>
    ),
  },
  {
    id: 'certifications',
    title: 'Certifications',
    content: (
      <div className='grid md:grid-cols-3 grid-cols-2 pl-2'>
        <p className='mb-4'>
          <Image className='mb-3' src="/images/about/hackerrank.png" width={50} height={50} alt="certifications"></Image>
          <span className='text-[--primary]'>SQL Basic</span>
        </p>
        <p className='mb-4'>
          <Image className='mb-3' src="/images/about/hackerrank.png" width={50} height={50} alt="certifications"></Image>
          <span className='text-[--primary]'>Java Basic</span>
        </p>
      </div>
    ),
  },
]

const AboutSection = () => {
  const [tab, setTab] = useState('skills')
  const [,startTransition] = useTransition()
  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id)
    })
  }
  return (
    <section className='text-white' id="about">
      <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image src="/images/about/about-image.png" width={500} height={500} alt="about-image"></Image>
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-[--primary] mb-4'>About Me</h2>
          <p className='text-base lg:text-lg text-[--primary]'>As an enthusiastic IT student with a deep passion for technology and problem-solving,
            I am seeking an opportunity to
            learn and contribute in a dynamic
            team environment, developing
            my skills while supporting
            creative projects.</p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton selectTab={() => handleTabChange('skills')} active={tab === 'skills'}>{" "}Skills{" "}</TabButton>
            <TabButton selectTab={() => handleTabChange('education')} active={tab === 'education'}>{" "}Education{" "}</TabButton>
            <TabButton selectTab={() => handleTabChange('certifications')} active={tab === 'certifications'}>{" "}Certifications{" "}</TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>        </div>
      </div>
    </section>
  )
}

export default AboutSection