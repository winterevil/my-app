import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white'>
      <div className="w-full p-12 flex justify-between">
        <span><Link href={"/#home"}>
          <Image src="/images/logo.png" width={50} height={50} alt="logo"></Image>
        </Link></span>
        <p className='text-white'>© 2024 All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer