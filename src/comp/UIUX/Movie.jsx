//메인페이지

"use client";
import "../style/main.scss";
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/movie_store';
import { useStore2 } from '../store/movie_detail_store';
import { useStore4 } from '../store/movie_poster';
import { movie_server } from '../store/movie_server';
import { format, subDays } from 'date-fns';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function Movie(props) {
    let { dataFetch, dailyBoxOffice, dailyRank, movieCode, movieDate } = useStore();
    let { getMovie } = movie_server();
    let { dataFetch2 } = useStore2();
    let { dataFetch4, posterUrl } = useStore4();
    const [listBtn, setListBtn] = useState();


    let today = new Date();
    let yesterday = format(subDays(today, 1), "yyyyMMdd")
    useEffect(() => {
        dataFetch(yesterday)
        getMovie();

        dataFetch2();
    }, [])
    // console.log(dailyBoxOffice)
    useEffect(() => {
        dataFetch4(dailyBoxOffice, movieDate)
    }, [dailyBoxOffice])
    // console.log(posterUrl);

    if (dailyBoxOffice.length === 0 && posterUrl.length === 0) return;

    const posterClick = (k) => {
        setListBtn(k)
    }

    return (
        <>
            <article className='main_movie'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}

                    modules={[Autoplay]}
                    className="mySwiper"
                    style={{ height: 'auto' }}
                >

                    {
                        posterUrl.slice(0, 3).map((obj, k) => (
                            <SwiperSlide key={k}>
                                <div className="poster">
                                    <Image src={obj}
                                        width={1000} height={1500}
                                        alt={dailyBoxOffice[k]}
                                        priority />
                                    <div className="overlay"></div>
                                </div>

                                <div className="poster_pc">
                                    <Image src={obj}
                                        width={1000} height={1500}
                                        alt={dailyBoxOffice[k]}
                                    />
                                </div>

                                <div className="inner">
                                    <div className="txt_group">
                                        <h3 className="name">{dailyBoxOffice[k]}</h3>
                                        <h3 className="sub_name">Avatar: The Way of Water</h3>

                                        <div className="txt_conts">
                                            <div className='reserve_rate'>
                                                <h4>예매율</h4>
                                                <p>{dailyRank[k]}<span> st</span></p>
                                            </div>
                                            <div className='grade'>
                                                <h4>평점</h4>
                                                <Image src="/images/star_icon.svg" width={15} height={15} className="star_icon" />
                                                <p>9.3</p>
                                            </div>
                                            <div className="audience">
                                                <h4>누적관객(만)</h4>
                                                <Image src="/images/person_icon.svg" width={15} height={15} className="person_icon" />
                                                <p>547,000<span> +</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))
                    }
                </Swiper>


            </article>
            <article className='box_office'>
                <div className="inner">
                    <h2>박스 오피스</h2>
                    <ul>
                        <Swiper
                            slidesPerView={1.5}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 30,
                                },
                            }}
                            className="mySwiper"
                        >
                            {
                                posterUrl.map((obj, k) => (
                                    <SwiperSlide key={k}>
                                        <li className="boxoffice_list" onClick={() => posterClick(k)}>
                                            <Image src={obj}
                                                width={200}
                                                height={250}
                                                alt="박스오피스 영화포스터" />
                                            <div className="rank">{k + 1}</div>
                                            <div className={`list_btn ${listBtn === k ? 'active' : ''}`}>
                                                <div className="btn on mob ">상세보기</div>
                                                <div className="btn on mob ">예매하기</div>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>


                    </ul>
                </div>
            </article>
            <article className='trailer'>
                <div className="inner">
                    <h2>트레일러</h2>
                    <ul>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <li>
                                    <div className="slide">
                                        <div className="slide_box">
                                            <Image src="/images/inside.png"
                                                width={200}
                                                height={150}
                                                alt="트레일러 썸네일"
                                                priority
                                            />
                                        </div>
                                        <div className="play_box">
                                            <Image src="/images/play_icon.svg"
                                                width={100}
                                                height={100}
                                                alt="play icon"
                                            />
                                        </div>
                                        <p className="slide_title">
                                            &#91;인사이드 아웃 2&#93; 파이널 예고편
                                        </p>
                                    </div>
                                </li>
                            </SwiperSlide>

                            <SwiperSlide>
                                <li>
                                    <div className="slide">
                                        <div className="slide_box">
                                            <Image src="/images/inside.png"
                                                width={200}
                                                height={150}
                                                alt="트레일러 썸네일"
                                                priority
                                            />
                                        </div>
                                        <div className="play_box">
                                            <Image src="/images/play_icon.svg"
                                                width={100}
                                                height={100}
                                                alt="play icon"
                                            />
                                        </div>
                                        <p className="slide_title">
                                            &#91;인사이드 아웃 2&#93; 파이널 예고편
                                        </p>
                                    </div>
                                </li>
                            </SwiperSlide>

                            <SwiperSlide>
                                <li>
                                    <div className="slide">
                                        <div className="slide_box">
                                            <Image src="/images/inside.png"
                                                width={200}
                                                height={150}
                                                alt="트레일러 썸네일"
                                                priority
                                            />
                                        </div>
                                        <div className="play_box">
                                            <Image src="/images/play_icon.svg"
                                                width={100}
                                                height={100}
                                                alt="play icon"
                                            />
                                        </div>
                                        <p className="slide_title">
                                            &#91;인사이드 아웃 2&#93; 파이널 예고편
                                        </p>
                                    </div>
                                </li>
                            </SwiperSlide>

                        </Swiper>
                    </ul>

                </div>
            </article>
            <article className='notice'>
                <div className="inner">
                    <h2>NOTICE</h2>
                    <ul>
                        <Swiper
                            direction={"vertical"}
                            loop={true}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={30}
                            modules={[Autoplay]}
                            className="mySwiper"

                        >
                            <SwiperSlide>서비스 이용약관 개정 안내</SwiperSlide>
                            <SwiperSlide>전 상영관 리뉴얼 오픈 안내 5/1~</SwiperSlide>
                        </Swiper>
                    </ul>
                </div>
            </article>
        </>
    );
}

export default Movie;