import React, { useEffect, useState } from 'react';
import './mypage.css';
import axios from 'axios';
import MyPageMenu from './MyPageMenu';
import MyContent from './MyContent';
import jwt_decode from 'jwt-decode';

function Mypage(props) {
    const memberNum = jwt_decode(localStorage.getItem('token')).idx;
    const [memberList, setMemberList] = useState('');
    // let memberList = '';

    const url = localStorage.url + '/member/getMemberInfo?idx=' + memberNum;

    const memberInfo = async () => {
        await axios.get(url).then((res) => {
            // console.log(res.data)
            setMemberList(res.data);
            // memberList = res.data;
            console.log(url);
            console.log(res.data);
            // console.log(memberList);
        });
    };

    useEffect(() => {
        memberInfo();
    }, []);
    // const memberInfo = () => {
    //     axios.get(url).then((res) => {
    //         // console.log(res.data)
    //         setMemberList(res.data);
    //         console.log(res.data);
    //     });
    // };

    // useEffect(() => {
    //     // axios.get(url)
    //     //     .then(res => {
    //     //         console.log(res.data);
    //     //         setMemberList(res.data);
    //     //         console.log(memberList);
    //     //     })
    //     memberInfo();
    //     console.log(memberList);
    // }, []);

    return (
        <div>
            <h2 style={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '50px'
            }}>프로필 관리</h2>
            <div id='wrapper'>
                <div class='content'>
                    <div id='menu'>
                        <MyPageMenu memberList={memberList} />
                    </div>
                    <div id='myContent'>
                        <MyContent memberList={memberList} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;
