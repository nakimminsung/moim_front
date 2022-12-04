import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import List from './List';
import axios from 'axios';
import qs from 'query-string';
import RoomCard from './Card';
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
function SearchRoom(props) {
    const [roomName, setRoomName] = useState('');
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const [headCount, setHeadCount] = useState(1);
    const [sprice, setSprice] = useState('0');
    const [eprice, setEprice] = useState('500000');
    const [stime, setStime] = useState('0');
    const [etime, setEtime] = useState('24');
    const [facility, setFacility] = useState('');
    const [holiday, setHoliday] = useState('');
    // 쿼리스트링으로 넘어오는 인자를 받기위해 useLocation 사용
    const searchParams = useLocation().search;
    // location의 search에 쿼리스트링 내용 담겨있음(?searchWord=)
    const query = qs.parse(searchParams);
    const searchWord = new URLSearchParams(searchParams).get('searchWord');
    const [roomData, setRoomData] = useState([]);
    const [sort, setSort] = useState('a.readCount desc');

    // 테마의 공간 리스트 select
    const selectCategoryRoomList = () => {
        let selectUrl = localStorage.url + '/searchroom';
        let facilityCount = facility.length;
        setSprice(sprice ? sprice : 0);
        setEprice(eprice ? eprice : 500000);
        setStime(stime ? stime : 0);
        setEtime(etime ? etime : 24);
        setHoliday(holiday ? holiday : 99);
        let selectData = {
            searchWord,
            sort,
            headCount,
            address,
            roomName,
            payment,
            sprice,
            eprice,
            facility,
            facilityCount,
            holiday,
            stime,
            etime,
        };
        axios.post(selectUrl, selectData).then((res) => setRoomData(res.data));
    };

    useEffect(() => {
        selectCategoryRoomList();
    }, [sort,
        roomName,
        address,
        headCount,
        sprice,
        eprice,
        facility,
        payment,
        holiday,
        stime,
        etime,]);

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

export default SearchRoom;