import React from 'react'
import Header from '../components/layout/Header'
import LoginBody from '../components/AuthPages/LoginBody'

function LoginPage() {
    return (
        <>
            <div className='text-darkOlive'>

                <Header />

                <main>
                    <LoginBody />
                </main>

            </div>
        
        </>
    )
}

export default LoginPage