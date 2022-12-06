import React, { useEffect, useState } from 'react';
import './mypage.css';
import jwt_decode from 'jwt-decode';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextsmsIcon from '@material-ui/icons/Textsms';
import HelpIcon from '@material-ui/icons/Help';
import HistoryIcon from '@material-ui/icons/History';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
function MyPageMenu(props) {
    const token = jwt_decode(localStorage.getItem('token'));
    const [email, setEmail] = useState(`${token.email}`);
    const userNum = jwt_decode(localStorage.getItem('token')).idx;
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
                    <img alt="updateprofileImage" src={`${props.memberList.profile_image}`} className="updateprofileImage" />
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
            <hr />
            <div className="my-menu" style={{ marginTop: '30px', textAlign: "center" }}>
                <div className="my-menu-top">
                    <h3 style={{ "fontWeight": 1000 }}>나의 정보</h3>
                    <div style={{ textAlign: 'left', paddingLeft: '20%' }}>
                        <a className="myreview" href="/review"><TextsmsIcon />&nbsp;나의리뷰</a>
                        {/* <br /> */}
                        <a className="mylike" href="/like"><FavoriteIcon />&nbsp;찜 목록</a>
                        {/* <br /> */}
                        <a className="mylist" href={`../booking/list/${userNum}`}><EventAvailableIcon />&nbsp;나의예약</a>
                        <a className="recent" href={`/recent/${userNum}`}><HistoryIcon />&nbsp;최근 본 장소</a>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyPageMenu;