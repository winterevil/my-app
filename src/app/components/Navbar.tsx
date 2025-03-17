"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import NavLink from './NavLink'
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline'
import MenuOverlay from './MenuOverlay'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const navLinks = [
    {
        path: "/#about",
        title: "About"
    },
    {
        path: "/#projects",
        title: "Projects"
    },
    {
        path: "/#contact",
        title: "Contact"
    },
    {
        path: "/github",
        title: "Search"
    }
]

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <nav className='fixed mx-auto border border-[--bcolor] top-0 left-0 right-0 z-10 bg-[--background] bg-opacity-100'>
            <div className='flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2'>
                <Link href={"/#home"} className="text-2xl md:text-5xl text-white font-semibold">
                    <Image src="/images/logo.png" width={80} height={80} alt="logo"></Image>
                </Link>

                <div className="mobile-menu flex md:hidden items-center space-x-4">
                    {mounted && (
                        <button className='p-2 rounded-md bg-gray-200 dark:bg-gray-700'
                            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
                            {currentTheme === 'dark' ? <SunIcon className='h-5 w-5 text-[--primary]' /> : <MoonIcon className='h-5 w-5 text-[--primary]' />}
                        </button>
                    )}
                    <button onClick={() => setNavbarOpen(!navbarOpen)} className='flex items-center px-3 py-2 border rounded border-slate-800 text-slate-800 hover:text-[--primary] hover:border-[--primary]'>
                        {navbarOpen ? <XMarkIcon className='h-5 w-5' /> : <Bars3Icon className='h-5 w-5' />}
                    </button>
                </div>
                <div className="menu hidden md:flex md:items-center md:space-x-8" id="navbar">
                    <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
                        {
                            navLinks.map((link, id) => {
                                return (
                                    <li key={id}>
                                        <NavLink href={link.path} title={link.title} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {mounted && (
                        <button className='p-2 rounded-md bg-gray-200 dark:bg-gray-700'
                            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
                            {currentTheme === 'dark' ? <SunIcon className='h-5 w-5 text-[--primary]' /> : <MoonIcon className='h-5 w-5 text-[--primary]' />}
                        </button>
                    )}
                </div>
            </div>
            {navbarOpen && <MenuOverlay links={navLinks} />}
        </nav>
    )
}

export default Navbar
