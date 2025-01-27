import React from 'react'

function QualitiesSection() {
    return (
        <section className='text-ivory gap-4 pb-32'>
            <div className='grid grid-cols-12 gap-y-5 gap-[10px] md:gap-12'>

                <article className='col-span-12 md:col-span-6 xl:col-span-3'>
                    <div className='aspect-[5/4] flex flex-col items-center justify-center'>
                        <picture>
                            <img src="https://cdn.sanity.io/images/4t60hegj/production/625a4e9f99f19852f5cbaea51be2547996ea443b-145x167.svg?auto=format&q=75&w=600" alt="" />
                        </picture>
                    </div>

                    <h3 className='font-mono uppercase text-sm'>CÀ PHÊ CỦA CHÚNG TÔI:</h3>
                    <p className='text-lg'>
                        Rang cà phê ở cấp độ cao nhất, đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu.
                    </p>
                </article>
                
                <article className='col-span-12 md:col-span-6 xl:col-span-3'>
                    <div className='aspect-[5/4] flex flex-col items-center justify-center'>
                        <picture>
                            <img src="https://cdn.sanity.io/images/4t60hegj/production/8a2394a8b6d44c4b43f82187892faf7a0281997a-257x164.svg?auto=format&q=75&w=600" alt="" />
                        </picture>
                    </div>

                    <h3 className='font-mono uppercase text-sm'>Đội ngũ nhân viên:</h3>
                    <p className='text-lg'>
                    ảm bảo cuộc sống và môi trường làm việc viên mãn cho nhân viên.
                    </p>
                </article>

                <article className='col-span-12 md:col-span-6 xl:col-span-3'>
                    <div className='aspect-[5/4] flex flex-col items-center justify-center'>
                        <picture>
                            <img src="https://cdn.sanity.io/images/4t60hegj/production/4019ddadaa4a8eb018622c558186064bc7950a22-184x184.svg?auto=format&q=75&w=600" alt="" />
                        </picture>
                    </div>

                    <h3 className='font-mono uppercase text-sm'>Hợp tác cùng nông dân:</h3>
                    <p className='text-lg'>
                        Chúng tôi trả giá thu mua cao và hỗ trợ các chương trình xã hội.
                    </p>
                </article>

                <article className='col-span-12 md:col-span-6 xl:col-span-3'>
                    <div className='aspect-[5/4] flex flex-col items-center justify-center'>
                        <picture>
                            <img src="https://cdn.sanity.io/images/4t60hegj/production/fbc5142d073ca7f6d26304270ce2a7df337e868e-196x191.svg?auto=format&q=75&w=600" alt="" />
                        </picture>
                    </div>

                    <h3 className='font-mono uppercase text-sm'>Hành tinh của chúng ta:</h3>
                    <p className='text-lg'>
                        Sử dụng các lựa chọn tái chế và thân thiện với môi trường trong mọi khả năng.
                    </p>
                </article>

            </div>
        </section>
    )
}

export default QualitiesSection