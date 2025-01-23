import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginBody() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login', {email, password})
        .then(result => {
            console.log(result);
        })
        .catch(result => console.log(result))

    }

    return (
        <section className='bg-blue-100 w-full flex h-screen'>
            <article className='w-1/2'>
                <div id='loginBG'></div>
            </article>

            <article className='w-1/2 bg-primaryGreen text-bgColor items-center justify-center'>
                <div className='h-screen w-full flex flex-col justify-center md:px-[40px] sm:px-[20px]'>
                    <div className='mx-auto w-full lg:max-w-[400px]'>

                        <h2 className="text-center font-serifs text-[40px] lg:text-[60px] font-thin">
                            Đăng nhập
                        </h2>

                        <form onSubmit={handleSubmitLogin} className="mt-8 space-y-6">
                            <div>
                                <input type="email" placeholder='Email' 
                                    className='input-primary block w-full' 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input type="password" placeholder='Mật Khẩu' 
                                    className='input-primary block w-full' 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type='submit' className='block w-full button text-primaryGreen hover:text-ivory'>
                                Đăng Nhập
                            </button>
                        </form>

                        <div className='font-mono mt-4 text-[14px] flex flex-col text-center gap-2'>
                            <p className=''>
                                <a href="" className='underline hover:no-underline hover:text-bgColor'>
                                    Quên mật khẩu?
                                </a>
                            </p>
                            <p>
                                Chưa có tài khoản? 
                                <Link to="/Signup" className='underline hover:no-underline hover:text-bgColor pl-2'>
                                    Đăng ký ngay!
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </article>
        </section>
    )
}

export default LoginBody