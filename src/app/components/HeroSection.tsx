"use client"
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion'

const HeroSection = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/LeThanhLong.pdf';
        link.download = 'LeThanhLong.pdf';
        link.click();
    }
    return (
        <section className='lg:py-16' id="home">
            <div className='grid grid-cols-1 sm:grid-cols-12'>
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
                    <h1 className="text-[--primary] mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                            Hello, I&apos;m{" "}
                        </span><br />
                        <TypeAnimation
                            sequence={[
                                'Long Lê',
                                1000,
                                'Back-end Developer',
                                1000,
                                'Front-end Developer',
                                1000,
                                'Web Developer',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </h1>
                    <p className='text-[--secondary] text-base sm:text-lg mb-6 lg:text-xl'>
                        This portfolio showcases my journey as I explore the world of software development, build innovative projects,
                        and continuously grow my skills. I’m excited to share my work and connect with like-minded individuals who share a love
                        for technology and innovation. Welcome!
                        
                    </p>
                    <div>
                        <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white'>Hire me</button>
                        <button onClick={handleDownload} className='px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 bg-transparent hover:bg-slate-600 text-[--primary] mt-3'>
                            <span className="block bg-[--background] hover:bg-slate-300 rounded-full px-5 py-2">Download CV</span>
                        </button>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-4 place-self-center mt-4 lg:mt-0">
                    <div className="rounded-full bg-[--rbackground] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                        <Image className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" src="/images/hero-image.png" alt="hero image" width={300} height={300} />
                    </div>
                </motion.div>
            </div>
        </section >
    )
}

export default HeroSection
