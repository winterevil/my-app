"use client";
import { useEffect, useState } from "react";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-6 p-3 rounded-full bg-primary-500 text-white shadow-lg transition-opacity ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"
                } z-50`}
        >
            <ChevronDoubleUpIcon className="w-6 h-6" />
        </button>
    );
};

export default ScrollToTop;
