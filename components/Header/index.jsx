import React from 'react'
import Image from 'next/image'
import { MdMenu } from 'react-icons/md'

function Header () {
  return (
    <header className='flex justify-between items-center py-6 shadow-md'>
      <Image
        src='/img/logo.png'
        alt='Logotipo de Black Bears'
        width={85}
        height={50}
      />
      <div className='text-3xl mr-6'>
        <MdMenu />
      </div>
    </header>
  )
}

export { Header }
