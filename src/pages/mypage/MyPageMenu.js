import React, { useEffect, useState } from 'react';
import './mypage.css';
import jwt_decode from 'jwt-decode';
function MyPageMenu(props) {
    const token = jwt_decode(localStorage.getItem('token'));
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

    useEffect(() => {
        hideEmail()
    }, [])

    return (
        <div className="my-menu-wrapper">
            {/* <input type="hidden" name="birth" value="${sessionScope.loginBirth}" /> */}
            <div className="my-profile" style={{ textAlign: "center" }}>
                <div className="my-pofile-left" style={{ display: "flex", display: "inline-block", marginBottom: '20px' }}>
                    {
                        localStorage.getItem('token') !== null ?
                            <img alt="updateprofileImage" src={jwt_decode(localStorage.getItem('token')).profile_image} className="updateprofileImage" />
                            :
                            <img alt="updateprofileImage" src={`http://localhost:9000/image/${props.memberList.profile_image}`} className="updateprofileImage" />
                    }
                </div>
                <div>
                    <b>{email}</b>
                </div>
                <div className="my-profile-right" style={{
                    paddingLeft: "10px", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "flex"
                }}>
                    {/* <b style={{ "fontSize": 25px; "display": block; "fontWeight": 1000;}}></b> */}
                    {/* <b className="birth">내 생일은 </b> */}
                </div>
            </div>
            <div className="my-menu" style={{ marginTop: '30px', textAlign: "center" }}>
                <div className="my-menu-top">
                    <h3 style={{ "fontWeight": 1000 }}>나의 정보</h3>
                    <a className="myreview" href="/review">나의리뷰</a>
                    <a className="mylike" href="/like">찜 목록</a>
                    <a className="myquestion" href="/">문의내역</a>
                </div>
            </div>
        </div >
    );
}

export default MyPageMenu;