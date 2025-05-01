import Footer from '@/components/homePage/footer'
import Header from '@/components/homePage/header'
import MainSection from '@/components/homePage/main-section'
import Navbar from '@/components/homePage/navbar'
import React from 'react'

const Page = () => {
  return (
    <main className="flex flex-col w-full h-auto">
      <Navbar/>
      <Header/>
      <MainSection/>
      <Footer/>
    </main>
  )
  
}

export default Page
