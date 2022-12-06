import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MiniCard from './MiniCard';
import styled from 'styled-components';
import { Box } from '@mui/system';

function Recent(props) {
    const [data, setData] = useState([]);
    // let url =
    // localStorage.url +
    // '/room?detail=' +

    useEffect(() => {
        setData(JSON.parse(sessionStorage.getItem('watched')));
        console.log(sessionStorage.getItem('watched'));
    }, [sessionStorage.getItem('watched')]);
    return (
        <>
            <h2>최근 본 상품</h2>
            <hr />
            <br />
            {/* {userNum} */}
            <RoomList>
                {data && data.length !== 0
                    ? data.reverse()
                        .map((item, i) => <MiniCard num={item} />)
                    : ''}
            </RoomList>
        </>
    );
}
const RoomList = styled(Box)`
    margin-top:20px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
`;
export default Recent;