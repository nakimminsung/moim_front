import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import List from './List';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryRoom(props) {
    const [categoryData, setCategoryData] = useState('');
    const [roomData, setRoomData] = useState([]);
    const [sort, setSort] = useState('a.readCount desc');
    const [roomName, setRoomName] = useState('');
    const [headCount, setHeadCount] = useState('');
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const [sprice, setSprice] = useState(0);
    const [eprice, setEprice] = useState(500000);
    const [stime, setStime] = useState('0');
    const [etime, setEtime] = useState('24');
    const [facility, setFacility] = useState([]);
    const { categoryNum } = useParams();

    // 테마의 공간 리스트 select
    const selectCategoryRoomList = () => {
        let url =
            localStorage.url +
            '/categoryroomList?categoryNum=' +
            categoryNum +
            '&sort=' +
            sort +
            '&headCount=' +
            headCount +
            '&address=' +
            address +
            '&name=' +
            roomName +
            '&payment=' +
            payment +
            '&sprice=' +
            sprice +
            '&eprice=' +
            eprice +
            '&facility=' +
            facility +
            '&facilityLength=' +
            facility.length;
        axios.get(url).then((res) => setRoomData(res.data));
        console.log(url);
        console.log(roomData);
    };

    useEffect(() => {
        selectCategoryRoomList();
    }, [sort, roomName, address, headCount, payment, sprice, eprice]);

    return (
        <>
            <Filter
                setRoomName={setRoomName}
                address={address}
                setAddress={setAddress}
                headCount={headCount}
                setHeadCount={setHeadCount}
                roomData={roomData}
                sort={sort}
                setSort={setSort}
                payment={payment}
                setPayment={setPayment}
                sprice={sprice}
                eprice={eprice}
                setSprice={setSprice}
                setEprice={setEprice}
                setFacility={setFacility}
            />
            <List roomData={roomData}
                sort={sort}
                setSort={setSort} />
        </>
    );
}

export default CategoryRoom;