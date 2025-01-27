import React from 'react'

function AwardsSection() {
    return (
        <section className='text-ivory py-12 md:py-24 border-t border-b border-ivory'>
            <div className='grid grid-cols-12 gap-y-8 gap-5'>

                <article className='col-span-12 lg:col-span-5'>
                    <h2 className='font-extralight font-ibm-plex text-4xl lg:text-6xl'>
                        Giải thưởng & <br />
                        Vinh danh
                    </h2>
                </article>

                <article className='col-span-12 lg:col-span-7 text-justify'>
                    <div className='grid grid-cols-12 gap-[10px] md:gap-5'>
                        
                        <div className='col-span-12 md:col-span-6 lg:pr-10'>
                            <ul className='list-disc space-y-1 text-lg font-medium'>
                                <li>
                                    3 lần đoạt giải Good Food Awards
                                </li>

                                <li>
                                    Quán quân Cold Brew xuất sắc nhất Hoa Kỳ, tại Coffee Fest Baltimore
                                </li>

                                <li>
                                    Top 30 loại cà phê được đánh giá hàng năm trên Coffee Review, các năm 2015-2018, 2020-21, 2023
                                </li>

                                <li>
                                    Hơn 50 loại cà phê được chấm điểm trên 90 bởi Coffee Review
                                </li>
                            </ul>
                        </div>

                        <div className='col-span-12 md:col-span-6'>
                            <ul className='list-disc space-y-1 text-lg font-medium'>
                                <li>
                                    Quán quân Brewers Cup, Vòng loại Giải vô địch Cà phê Hoa Kỳ khu vực Tennessee, năm 2019
                                </li>

                                <li>
                                    Huy chương Bạc & Đồng tại Golden Bean, các năm 2016, 2017, 2019
                                </li>

                                <li>
                                    Hạng chín tại Giải vô địch Brewers Cup toàn quốc Hoa Kỳ, tổ chức ở Seattle
                                </li>

                                <li>
                                    Quán quân Espresso xuất sắc nhất Hoa Kỳ, tại Coffee Fest NYC
                                </li>
                            </ul>
                        </div>

                    </div>
                </article>
                
            </div>
        </section>
    )
}

export default AwardsSection