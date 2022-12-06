import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import List from './List';

function Recent(props) {
    const { userNum } = useParams();
    const [categoryData, setCategoryData] = useState('');
    const [roomData, setRoomData] = useState([]);
    const [headCount, setHeadCount] = useState(1);
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const [sprice, setSprice] = useState('0');
    const [eprice, setEprice] = useState('500000');
    const [stime, setStime] = useState('0');
    const [etime, setEtime] = useState('24');
    const [facility, setFacility] = useState('');
    const [holiday, setHoliday] = useState('');
    return (
        <>
            <h2>최근 본 상품</h2>
            <hr />
            <br />
            {/* {userNum} */}
            <List roomData={roomData} />
        </>
    );
}

export default Recent;