"use client";
import Footer from '@/components/homePage/footer'
import Header from '@/components/homePage/header'
import MainSection from '@/components/homePage/main-section'
import Navbar from '@/components/homePage/navbar'
import React, { useState } from 'react'

const Page = () => {

  const [type]= useState<'movies' | 'tvshows'>('movies');

  return (
    <main className="flex flex-col w-full h-auto">
      <Navbar/>
      <Header type={type}/>
      <MainSection/>
      <Footer/>
    </main>
  )
  
}

export default Page
