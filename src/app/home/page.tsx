import Header from '@/components/homePage/header'
import MainSection from '@/components/homePage/main-section'
import Navbar from '@/components/homePage/navbar'
import React from 'react'

const Page = () => {
  return (
    <main className="flex flex-col items-center w-full h-auto">
      <Navbar/>
      <Header/>
      <MainSection/>
    </main>
  )
  
}

export default Page
