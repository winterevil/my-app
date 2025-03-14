"use client"

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button className='p-2 border rounded bg-gray-200 dark:bg-gray-800'
        onClick={()=>setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
    );
}