import React from 'react'

function IntrocuctionSection() {
    return (
        <section className='pt-20 px-10 bg-primaryGreen text-ivory pb-20'>
            
            <article className='grid grid-cols-12 h-fit gap-5 pt-5'>

                <div className='col-span-6 self-end'>
                    <p className='font-serifs md:text-48 text-5xl mb-16'>
                        Rang cà phê hảo hạng đồng thời tạo nên ấn tượng tại nơi sản xuất và tại nhà.
                    </p>

                    <img src="https://cdn.sanity.io/images/4t60hegj/production/afa4ca116ae0b013671dcc26dba89dca1b305400-3185x3424.jpg?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/afa4ca116ae0b013671dcc26dba89dca1b305400-3185x3424.jpg&w=1000" alt="" />
                </div>

                <div className='col-span-5 col-start-8'>
                    <img className='md:mb-[120px]' src="https://cdn.sanity.io/images/4t60hegj/production/0a253cf544f8acbf404d022d09a390a96f47cb32-3637x3637.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/0a253cf544f8acbf404d022d09a390a96f47cb32-3637x3637.png&w=1000" alt="" />

                    <span className='text-lg font-normal'>
                        <p>
                            Chăm sóc Cà phê, Con người, Nông dân và Hành tinh của chúng ta
                        </p> <br />
                        <p>
                            Được thành lập vào năm 2010 tại trung tâm thành phố Cần Thơ, Việt Nam, RnG được thành lập với ý tưởng đơn giản là rang cà phê tuyệt hảo cho quán cà phê hiện tại của chủ sở hữu. Chẳng bao lâu, tiếng tăm về chất lượng của RnG lan rộng khắp Virginia và khắp Bờ biển phía Đông.
                        </p> <br />
                        <p>
                            Mặc dù chúng tôi đã giành được nhiều giải thưởng và danh hiệu về chất lượng cà phê, nhưng niềm đam mê thực sự của chúng tôi là tạo ra tác động xã hội tích cực cả trong và ngoài nước tại nơi sản xuất ra loại cà phê này.
                        </p>
                    </span>
                </div>

            </article>
        </section>
    )
}

export default IntrocuctionSection