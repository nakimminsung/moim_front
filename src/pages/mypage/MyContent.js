import React, { useEffect, useState } from 'react';
import './mypage.css';
import jwt_decode from 'jwt-decode';
import { Button } from '@material-ui/core';
import ProfileUpdate from './ProfileUpdate';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function MyContent(props) {
    const token = jwt_decode(localStorage.getItem('token'));
    const memberNum = jwt_decode(localStorage.getItem('token')).idx;
    const memberList = props;
    const [email, setEmail] = useState(`${token.email}`);

    const hideEmail = () => {
        let splitName = email.split('')      //입력받은 문자값을 단어하나하나로 쪼갠다.
        splitName.forEach((name, i) => {
            if (i <= 3) return                //문자값의 4번째 이후의 수에는 *를 리턴한다.
            splitName[i] = '*'
        })
        let filterName = splitName.join().replace(/,/g, '')
        setEmail(filterName.substring(0, 8)) //정규식
    }

    const deleteMember = () => {
        //confirm alert
        if (window.confirm('회원에서 탈퇴하시겠습니까?')) {
            let url = localStorage.url + '/member/delete?idx=' + memberNum
            console.log(url);

            //Back-End로 url 넘김
            axios.delete(url).then((res) => {
                //성공하고 리스트 다시 가져오기
                // window.location.reload();
                localStorage.clear();
                sessionStorage.clear();
                document.location.href = '/';
            });

            //삭제완료 alert
            alert('탈퇴 완료되었습니다.');
        } else {
            //아니오
            alert('취소하셨습니다');
        }
    };

    useEffect(() => {
        hideEmail()
    }, [])

    return (
        <div className="my-content-wrapper">
            <div className="my-content-profile" style={{ textAlign: "center" }}>
                <div className="my-profile-update" style={{ display: "flex", display: "inline-block", marginTop: '30px', marginBottom: '5px' }}>
                    <img alt="updateprofileImage" src={`http://localhost:9000/image/${memberList.profile_image}`} className="updateprofileImage" />
                </div>
                <div>
                    <b style={{ fontSize: '12px' }}>{email}</b>
                    <br />
                    <ProfileUpdate idx={memberNum} />
                    {/* <button style={{ marginTop: '5px' }}>프로필 사진 변경</button> */}
                </div>
                <hr />
                <div className="my-profile-right" style={{
                    paddingLeft: "10px", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "flex"
                }}>
                    <table style={{ width: '600px', height: '400px' }}>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'left' }}>닉네임</td>
                                <td style={{ textAlign: 'left' }}>{token.nickname}</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>비밀번호</td>
                                <td style={{ textAlign: 'left' }}>
                                    {token.password ? <Button variant="outlined" color="primary" size="small">비밀번호 변경하기</Button> : '소셜로그인은 비밀번호 변경 불가'}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>이메일</td>
                                <td style={{ textAlign: 'left' }}>{token.email}</td>
                                <td style={{ textAlign: 'left', color: '#FAE267' }}>인증완료</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>연락처</td>
                                <td style={{ textAlign: 'left' }}>휴대폰 정보 없음</td>
                                <td style={{ textAlign: 'left' }}>
                                    <Button variant="outlined" color="primary" size="small">
                                        인증하기
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left' }}>SNS연동</td>
                                <td style={{ textAlign: 'left' }}>카카오연동</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <div>
                        <Button variant="outlined" style={{ width: '150px', textAlign: 'center' }}
                            color="secondary" onClick={() => {
                                deleteMember();
                            }}>서비스 탈퇴하기</Button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyContent;