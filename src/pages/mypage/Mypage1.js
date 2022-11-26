import React, { useEffect, useState } from 'react';
import './mypage.css';
import axios from 'axios';
import MyPageMenu from '../mypage/MyPageMenu';
import MyContent from '../mypage/MyContent';
import jwt_decode from 'jwt-decode';

function Mypage1(props) {
    const memberNum = jwt_decode(localStorage.getItem('token')).idx;
    const [memberList, setMemberList] = useState('');

    const url =
        localStorage.url +
        '/member/getMemberInfo?idx=' + memberNum

    const memberInfo = () => {
        axios.get(url).then((res) => {
            // console.log(res.data)
            setMemberList(res.data)
        });
    };

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setMemberList(res.data);
                console.log(memberList);
            })
    }, []);


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>프로필 관리</h2>
            <div id="wrapper">
                <div class="content">
                    <div id="menu">
                        <MyPageMenu memberList={memberList} />
                        {/* <tiles:insertAttribute name="menu" /> */}
                    </div>
                    <div id="myContent">
                        {/* <tiles:insertAttribute name="myContent" ignore="true" /> */}
                        <MyContent memberList={memberList} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage1;