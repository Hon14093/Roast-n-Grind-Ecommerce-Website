// ContactPage.jsx


import Navbar from "../hooks/Navbar"

import { SlLocationPin } from "react-icons/sl";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";

const ContactPage = () => {
    return (
        <div>
            {/* Thanh Navbar */}
            <Navbar />

            {/* Nội dung trang liên hệ */}
            <div className="flex flex-col container items-center gap-10 justify-center mx-auto text-cyan-900 py-14 px-6 md:px-20 lg:px-32 relative">
                <h1 className="text-5xl font-bold my-4 border-b-2 py-1">LIÊN HỆ NGAY</h1>

                <div className="w-full flex gap-7">
                    {/* Left side: Thông tin liên hệ */}
                    <div className="w-1/2 flex flex-col gap-5">
                        <div className="border px-4 py-8 flex gap-5 items-start rounded-lg hover:bg-gray-50 hover:scale-105 duration-300">
                            <SlLocationPin size={70} />
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-semibold">Địa chỉ</p>
                                <p className="text-xl">
                                    123 Đường Cà Phê, Quận 1, TP. Hồ Chí Minh, Việt Nam
                                </p>
                            </div>
                        </div>
                        <div className="border px-4 py-8 flex gap-5 items-start rounded-lg hover:bg-gray-50 hover:scale-105 duration-300">
                            <MdOutlineLocalPhone size={70} />
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-semibold">Số điện thoại</p>
                                <p className="text-xl">+84 123 456 789</p>
                            </div>
                        </div>
                        <div className="border px-4 py-8 flex gap-5 items-start rounded-lg hover:bg-gray-50 hover:scale-105 duration-300">
                            <IoMailOutline size={70} />
                            <div className="flex flex-col gap-2">
                                <p className="text-4xl font-semibold">Email</p>
                                <p className="text-xl">support@roastngrind.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Bản đồ */}
                    <div className="flex gap-4 flex-col w-1/2 justify-between">
                        <div className="text-4xl font-semibold">Ghé thăm chúng tôi</div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669756452852!2d106.68214421480048!3d10.762622992319252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f8a0b1d9%3A0x4c4f8e5c7d2b9c7a!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1735812345678!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            className="p-1 border-2"
                        ></iframe>
                    </div>
                </div>

                <p className="text-2xl w-full">
                    Liên hệ với chúng tôi – chúng tôi luôn sẵn sàng giúp bạn có trải nghiệm tuyệt vời với Roast-n-Grind!
                </p>
            </div>
        </div>
    );
};

export default ContactPage;