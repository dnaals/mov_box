"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/movie_store';
import { useStore4 } from '../store/movie_poster';
import { loginStore } from '../store/login_store';
import Image from 'next/image';
import Link from 'next/link';
import '../style/header.scss';

function M_header() {
    let { dataFetch, dailyBoxOffice, movieCode } = useStore();
    let { posterUrl } = useStore4();
    let { storegeFn, storege, isLogined } = loginStore();
    let [menuOn, setMenuOn] = useState(false);
    let [searchInput, setSearchInput] = useState('');
    let [searchValue, setSearchValue] = useState([]);
    let [searchView, setSearchView] = useState(false);

    const dataComb = dailyBoxOffice.map((movie, id) => {
        return {
            movie, code: movieCode[id], poster: posterUrl[id]
        }
    })
    // console.log(dataComb, 'dataComb')

    const submitSearch = (e) => {
        e.preventDefault()
        if (searchInput === '') {
            setSearchView(false)
            return;
        }

        let d = dataComb.filter((obj) => (
            (obj.movie.includes(searchInput)) || (obj.code.includes(searchInput))
        ))

        if (d.length === 0) {
            alert('검색결과가 없습니다.')
        }
        setSearchValue(d);
        setSearchInput('');
        setSearchView(true);
    }

    const searchBack = () => {
        setSearchView(false)
        setSearchValue([]);
    }


    useEffect(() => {
    }, [searchValue])

    const menuClick = () => {
        setMenuOn(!menuOn);
        setSearchView(false);
        setSearchValue([]);
    }

    const logout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            setSearchView(false)
            setMenuOn(false)
            storegeFn('logout')
        }
    }

    return (
        <header className={menuOn ? 'on' : ''}>
            <h1 className='Logo'><Link href='/'><Image src='/images/logo.svg' alt='logo' width={153} height={30} />Mov_logo</Link></h1>
            <div className={menuOn ? "menu_btn on" : "menu_btn"} onClick={menuClick}><span>menu</span></div>
            <div className='menu'>
                <nav>
                    <form onSubmit={submitSearch}>
                        <input type="text" value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                        <Image src='/images/search_icon.png' alt='search' width={18} height={18} />
                    </form>
                    <Link href={{
                        pathname: '/reserve',
                        query: {
                            posterUrlList: JSON.stringify(posterUrl)
                        }
                    }}
                    >Ticket</Link>

                    <Link href={isLogined ? "/" : "/login"}
                        onClick={(e) => {
                            if (isLogined) {
                                e.preventDefault();
                                logout();
                            }
                        }}
                    >
                        {isLogined ? 'Logout' : 'Login'}
                    </Link>

                    <Link href={isLogined ? "/mypage" : "/login"}>My page</Link>
                </nav>

                <div onClick={searchBack}>
                    {
                        searchView && (
                            <div className={`search_board ${searchValue.length > 0 ? 'active' : ''}`} >
                                {
                                    searchValue.map((obj, k) => (
                                        <div key={k} className='searchEl'>
                                            <Link href={{
                                                pathname: '/detail',
                                                query: {
                                                    posterUrlDetail: obj.poster,
                                                    movieCd: obj.code
                                                }
                                            }}>
                                                <Image src={obj.poster}
                                                    width={200} height={280}
                                                    alt="poster"
                                                />
                                            </Link>
                                            <div className='searchEl_title'>{obj.movie}</div>
                                        </div>

                                    ))
                                }
                            </div>
                        )}
                </div>

            </div>
            <div className={menuOn ? 'sub_menu on' : 'sub_menu'}>
                <form onSubmit={submitSearch}>
                    <input type="text" placeholder='검색어를 입력하세요' value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
                    <Image src='/images/search_icon.png' alt='search' width={18} height={18} />
                </form>
                <div className='search_record'>
                    <p># 영화검색</p>
                    <p># 하츄핑</p>
                    <p># 송우민</p>
                    <p># 김지연</p>
                </div>
                <div className='linked'>
                    <Link href={{
                        pathname: '/reserve',
                        query: {
                            posterUrlList: JSON.stringify(posterUrl)
                        }
                    }} onClick={() => setMenuOn(false)}>Ticket</Link>

                    <Link href={isLogined ? "/" : "/login"}
                        onClick={(e) => {
                            if (isLogined) {
                                e.preventDefault();
                                logout();
                            } else {
                                setSearchView(false);
                                setMenuOn(false);
                            }
                        }}
                    >
                        {isLogined ? 'Logout' : 'Login'}
                    </Link>

                    <Link href={isLogined ? "/mypage" : "/login"} onClick={() => setMenuOn(false)}>My page</Link>
                </div>

                {
                    searchBack && (
                        <div className='search_board'>
                            {
                                searchValue.map((obj, k) => (
                                    <div key={k} className='searchEl'>
                                        <Link href={{
                                            pathname: '/detail',
                                            query: {
                                                posterUrlDetail: obj.poster,
                                                movieCd: obj.code
                                            }
                                        }}
                                            onClick={menuClick}
                                        >
                                            <Image src={obj.poster}
                                                width={200} height={280}
                                                alt="poster"
                                            />
                                        </Link>
                                    </div>

                                ))
                            }
                        </div>
                    )
                }
            </div>
        </header>
    );
}

export default M_header;