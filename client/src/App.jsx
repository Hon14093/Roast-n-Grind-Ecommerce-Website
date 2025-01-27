import { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomeMain from './pages/HomeMain'
import FooterTest from './components/layout/FooterTest'

function App() {
  
  return (
    <>
      <div className='text-darkOlive'>

          <Header />

        <main>
          <HomeMain />
        </main>

        <Footer />
        
      </div>
      
    </>
  )
}

export default App
