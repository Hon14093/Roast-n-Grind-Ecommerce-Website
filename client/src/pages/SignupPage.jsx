import React from 'react'
import Header from '../components/layout/Header'
import SignupBody from '../components/SignupBody'

function SignupPage() {
    return (
        <>
            <div className='text-black'>

                <Header />

                <main>
                    <SignupBody />
                </main>

            </div>
        
        </>
    )
}

export default SignupPage