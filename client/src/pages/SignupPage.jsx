import React from 'react'
import Header from '../components/layout/Header'
import SignupBody from '../components/AuthPages/SignupBody'

function SignupPage() {
    return (
        <>
            <div className='text-darkOlive'>

                <Header />

                <main>
                    <SignupBody />
                </main>

            </div>
        
        </>
    )
}

export default SignupPage