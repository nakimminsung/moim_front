import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import List from './List';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryRoom(props) {
    const [categoryData, setCategoryData] = useState('');
    const [roomData, setRoomData] = useState([]);
    const [sort, setSort] = useState('readCount desc');
    const [roomName, setRoomName] = useState('');
    const [headCount, setHeadCount] = useState('');
    const [address, setAddress] = useState('');
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
            '&sort=' +
            sort;
        axios.get(url).then((res) => setRoomData(res.data));
        console.log(roomData);
    };

    useEffect(() => {
        selectCategoryRoomList();
    }, [sort, roomName, address, headCount]);

    return (
        <>
            <Filter
                roomName={roomName}
                setRoomName={setRoomName}
                address={address}
                setAddress={setAddress}
                headCount={headCount}
                setHeadCount={setHeadCount}
                roomData={roomData}
            />
            <List roomData={roomData}
                sort={sort}
                setSort={setSort} />
        </>
    );
}

export default CategoryRoom;