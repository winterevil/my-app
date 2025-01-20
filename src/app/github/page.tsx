import React from 'react'
import Navbar from '../components/Navbar'
import RepoSearch from '../components/RepoSearch'
import Footer from '../components/Footer'

export default function Search() {
    return (
        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar />
            <div className="container mt-24 mx-auto px-12 py-4 flex-grow">
                <RepoSearch />
            </div>
            <Footer />
        </main>
    )
}
