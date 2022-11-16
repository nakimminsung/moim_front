import React from 'react';
import styled from '@emotion/styled/macro';
import { Box } from '@mui/material';
import Card from './Card';

function List(props) {
    const { roomData } = props;

    return (
        <RoomList>
            {roomData &&
                roomData.map((item, i) => (
                    <Card roomData={item} key={i} roomNum={item.num} />
                ))}
        </RoomList>
    );
}

export default List;

const RoomList = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: #fff;
`;
