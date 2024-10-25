'use client';
import { useState } from 'react';
import '../style/setting.scss'
import Link from 'next/link';
import Image from 'next/image';

function Setting({ setSettingClick, }) {

    const [settingActive, setSettingActive] = useState('')

    return (
        <div className='setting_page'>
            <h2 >
                <Image src='/images/arrow_back.png' width={30} height={30} alt='arrow_back_icon' onClick={() => { setSettingClick(false) }} />
                계정 설정
            </h2>

            <Link href={{
                pathname: '/mypage/setting',
                query: { type: 'change' }
            }}>
                <button className='btn' onClick={() => { setSettingActive('change') }}>비밀번호 변경</button>
            </Link>

            <Link href={{
                pathname: '/mypage/setting',
                query: { type: 'delete' }
            }}>
                <button className='btn' onClick={() => { setSettingActive('delete') }}>계정 삭제</button>
            </Link>
        </div>
    );
}

export default Setting;