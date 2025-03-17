"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface Repo {
    id: number;
    name: string;
    html_url: string;
}

interface UserInfo {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    created_at: string;
}

const RepoSearch: React.FC = () => {
    const [username, setUsername] = useState<string>(""); 
    const [repos, setRepos] = useState<Repo[]>([]); 
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null); 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUserInfo(null);

        try {
            const response = await fetch(`/api/github?username=${username}`);
            const data = await response.json();
            if (response.ok) {
                setRepos(data);
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userResponse.json();
                if (userResponse.ok) {
                    setUserInfo(userData);
                } else {
                    setError(userData.error);
                }
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error + "Error fetching data from GitHub API.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="search" className='bg-[--background] min-h-screen'>
            <h2 className="text-center text-4xl font-bold text-[--primary] mb-4 mt-4">Github Repository Search</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
                <div>
                    <form onSubmit={handleSearch} action="" className="space-y-2 mb-2.5">
                        <label htmlFor="search" className="text-[--primary] text-sm font-medium block">
                            Username
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                id="search"
                                value={username}
                                onChange={handleInputChange}
                                required
                                className="bg-[--rbackground] border border-[--bcolor] placeholder-[--placeholder] text-gray-300 text-sm rounded-lg flex-1 p-2.5"
                                placeholder="Enter username here"
                            />
                            <button className="bg-primary-500 hover:bg-primary-600 text-[--primary] font-medium py-2.5 px-5 rounded-lg flex-shrink-0">
                                <Image src="/images/search.png" width={20} height={20} alt="search-icon"></Image>
                            </button>
                        </div>
                    </form>
                    {userInfo && (
                        <div className='bg-[--rbackground] border border-[--bcolor] placeholder-[--placeholder] text-gray-100 text-sm rounded-lg grid grid-cols-3 w-full py-2.5 md:px-7'>
                            <div className='col-span-1'>
                                <a href={`https://github.com/${userInfo.login}`} target="_blank" rel="noopener noreferrer">
                                    <Image src={userInfo.avatar_url} width={150} height={150} className='rounded-full' alt="User Avatar" />
                                </a>
                            </div>
                            <div className='col-span-2 px-1'>
                                <div>
                                    <a href={`https://github.com/${userInfo.login}`} target="_blank" rel="noopener noreferrer">
                                        <h1 className='text-2xl font-bold text-[--primary]'>{userInfo.name || userInfo.login}</h1>
                                    </a>
                                    <p className='text-[--primary]'>@{userInfo.login}</p>
                                    <p className='mt-3 text-[--primary]'>{userInfo.bio || 'No bio available'}</p>
                                    <div className='text-[--primary]'>Joined: {new Date(userInfo.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className='md:flex md:justify-between grid grid-cols-1 text-[--primary] w-full mt-3'>
                                    <div>
                                        <p>Repositories:</p>
                                        <p>{repos.length}</p>
                                    </div>
                                    <div>
                                        <p>Followers:</p>
                                        <p>{userInfo.followers}</p>
                                    </div>
                                    <div>
                                        <p>Following:</p>
                                        <p>{userInfo.following}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {loading ? (
                    <p className="text-[--primary] md:mt-8 px-7">Loading...</p>
                ) :
                    error ? (
                        <p className="text-red-500 md:mt-8 px-7">{error}</p>
                    ) : repos.length > 0 ? (
                        <div>
                            <p className="text-base text-[--primary] px-7 mb-2.5 md:px-0">Repositories:</p>
                            <div className="bg-[--rbackground] border border-[--bcolor] placeholder-[--placeholder] text-gray-100 text-sm rounded-lg block w-full py-2.5 px-7">
                                <ul className="space-y-2">
                                    {repos.map((repo) => (
                                        <li key={repo.id} className="text-[--primary]">
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary-500 break-all"
                                            >
                                                {repo.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="text-[--primary] md:mt-8 md:px-7">No repositories found</p>
                    )}
            </div>
        </section>
    );
};

export default RepoSearch;
