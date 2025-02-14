'use client'
import React from 'react'
import GithubIcon from '../../../public/github-icon.svg'
import LinkedinIcon from '../../../public/linkedin-icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
const EmailSection = () => {
    const [formData, setFormData] = React.useState({
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.info('Sending...');
        setStatus(
            'Sending...'
        );
        try {
            const response = await fetch('/api/postgres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setTimeout(() => {
                    toast.success('Message sent successfully');
                    setStatus('Sent');
                    setFormData({
                        email: '',
                        subject: '',
                        message: '',
                    })
                }, 1200);
            } else {
                toast.error(`Error: ${data.error}`);
                setStatus('Error');
            }
        } catch (error) {
            toast.error('Something went wrong' + error);
            setStatus('Error');
        }
    };

    return (
        <section id="contact" className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative'>
            <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-y-1/2'></div>
            <div className='z-9'>
                <h5 className='text-xl font-bold text-white my-2'>
                    Let&apos;s Connect
                </h5>
                <p className='text-[#ADB7BE] mb-4 max-w-md'>
                    I am always open to discussing new projects,
                    open-source contributions, or opportunities to
                    be collaborated on open-source projects.
                </p>
                <div className="socials flex flex-row gap-2">
                    <Link href="https://github.com/winterevil">
                        <Image src={GithubIcon} alt="Github Icon"></Image>
                    </Link>
                    <Link href="https://www.linkedin.com/in/th%C3%A0nh-l%C3%AA-long-4a2016336/">
                        <Image src={LinkedinIcon} alt="Linkedin Icon"></Image>
                    </Link>
                </div>
            </div>
            <div>
                <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">Your email</label>
                        <input type="email" id="email" required value={formData.email} onChange={handleChange}
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="jacob@google.com" />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="subject" className="text-white block mb-2 text-sm font-medium">Subject</label>
                        <input type="text" id="subject" required value={formData.subject} onChange={handleChange}
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Just saying hi" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="text-white block mb-2 text-sm font-medium">Message</label>
                        <textarea id="message" name="message" required value={formData.message} onChange={handleChange}
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hi there, I would like to ..." />
                    </div>
                    <button type="submit" className='bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full'>
                        Send Message
                    </button>
                    {status && <p>{status}</p>}
                </form>
            </div>
        </section>
    )
}

export default EmailSection