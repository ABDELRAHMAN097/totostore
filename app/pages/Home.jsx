import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div className='mx-5'>
        <div className='w-full'>
            <Image 
                src="/image/cursor1.png" 
                alt="Hero Image" 
                layout="responsive" 
                width={1920} 
                height={1080} 
                objectFit="cover"
            />
        </div>
    </div>
  )
}

export default Home
