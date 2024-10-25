"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { user } from '../../../comp/store/user';
import { loginStore } from '../../../comp/store/login_store';
import Link from 'next/link';
import '../../../comp/style/change.scss';

function Page() {
    let { userTable, userData } = user();
    let { storegeFn } = loginStore();
    const params = useSearchParams();
    const type = params.get('type');
    // console.log(type, 'type')

    const [changeStep, setChangeStep] = useState(0)
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [pwInput, setPwInput] = useState('');
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        const storedData = sessionStorage.getItem('login');
        sessionStorage.getItem('login')
        if (storedData) {
            try {
                // 문자열 데이터를 JSON 객체로 파싱
                const parsedData = JSON.parse(storedData);
                // console.log('사용자 정보:', parsedData[0]);
                setLoggedInUser(parsedData[0]);

            } catch (error) {
                console.error('JSON 파싱 에러:', error);
            }
        } else {
            console.log('로그인 정보가 없습니다.');
        }
    }, [])


    const oldPwCheck = () => {
        if (loggedInUser.user_pw === pwInput) {
            setChangeStep(changeStep + 1)
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }
    const newPwChange = () => {
        console.log(newPassword, 'newPassword')
        //유저 데이터 비번수정
    }

    const userDelete = () => {
        if (loggedInUser.user_pw === pwInput) {
            // console.log('pwInput', pwInput)
            if (confirm('정말 탈퇴하시겠습니까?')) {
                //유저 데이터 삭제
                // userData('delete', { user_id: parsedData[0].user_id })
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }


    return (

        <div className='setting_pop'>

            {
                type === 'change' && (
                    <div className='user_setting'>
                        <Link href={{ pathname: '/mypage' }}>
                            <span className='close'>close_btn</span>
                        </Link>

                        <h2>비밀번호 변경</h2>

                        {
                            changeStep === 0 && (
                                <div className='comp'>
                                    <p>현재 사용중인<br /> 비밀번호를 입력해주세요.</p>
                                    <div className='input_space'>
                                        <input type="text" placeholder='비밀번호' onChange={(e) => { setPwInput(e.target.value) }} />
                                    </div>
                                    <button className='btn mob' onClick={oldPwCheck}>확인</button>
                                </div>
                            )
                        }

                        {
                            changeStep === 1 && (
                                <div className='comp'>
                                    <p>변경할 비밀번호를 입력해주세요.</p>
                                    <div className='input_space'>
                                        <input type="text" placeholder='비밀번호' onChange={(e) => { setNewPassword(e.target.value) }} />
                                    </div>
                                    <button className='btn mob' onClick={newPwChange}>비밀번호 변경</button>
                                </div>
                            )
                        }

                    </div>

                )
            }

            {
                type === 'delete' && (

                    <div className='user_setting'>
                        <Link href={{ pathname: '/mypage' }}>
                            <span className='close'>close_btn</span>
                        </Link>
                        <h2>계정 삭제</h2>

                        <div className='comp'>
                            <p>안전한 계정 삭제를 위해<br />
                                현재 사용중인 비밀번호를 입력해주세요.
                            </p>
                            <div className='input_space'>
                                <input type="text" placeholder='비밀번호' onChange={(e) => { setPwInput(e.target.value) }} />
                            </div>
                            <button className='btn mob del' onClick={userDelete}>계정 삭제</button>
                        </div>

                    </div>

                )
            }





        </div>
    );
}

export default Page;