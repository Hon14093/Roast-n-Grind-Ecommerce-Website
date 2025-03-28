// LoginBody.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function LoginBody() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Vui lòng nhập email và mật khẩu.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            console.log("API login response:", response.data);

            if (response.data.token) {
                login(response.data.token);
                if (response.data.is_admin) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setError("Không nhận được token từ server.");
            }
        } catch (err) {
            console.error("Lỗi khi đăng nhập:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Đăng nhập thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <section className="bg-blue-100 w-full flex h-screen">
            <article className="w-1/2">
                <div id="loginBG"></div>
            </article>

            <article className="w-1/2 bg-primaryGreen text-bgColor items-center justify-center">
                <div className="h-screen w-full flex flex-col justify-center md:px-[40px] sm:px-[20px]">
                    <div className="mx-auto w-full lg:max-w-[400px]">
                        <h2 className="text-center font-serifs text-[40px] lg:text-[60px] font-thin">
                            Đăng nhập
                        </h2>

                        <form onSubmit={handleSubmitLogin} className="mt-8 space-y-6">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input-primary block w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Mật Khẩu"
                                    className="input-primary block w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            <button type="submit" className="block w-full button text-primaryGreen hover:text-ivory">
                                Đăng Nhập
                            </button>
                        </form>

                        <div className="font-mono mt-4 text-[14px] flex flex-col text-center gap-2">
                            <p>
                                <a href="" className="underline hover:no-underline hover:text-bgColor">
                                    Quên mật khẩu?
                                </a>
                            </p>
                            <p>
                                Chưa có tài khoản? 
                                <Link to="/signup" className="underline hover:no-underline hover:text-bgColor pl-2">
                                    Đăng ký ngay!
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}

export default LoginBody;