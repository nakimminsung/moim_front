import { FormControl, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';

function List(props) {
    const { num } = useParams();
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('readCount desc');

    const getRoomList = () => {
        let url = localStorage.url + '/categoryroomList?num=' +
            num +
            '&sort=' +
            sort;
        console.log(url);
        axios.get(url).then((res) =>
            setData(res.data)
        );
    };

    const optionChange = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        getRoomList();
    }, [sort])


    useEffect(() => {
        getRoomList();
    }, []);


    return (
        <ListWrapper>
            <RoomList>
                {data &&
                    data.map((item, i) => (
                        <Card roomData={item} key={i} roomNum={item.num} />
                    ))}
            </RoomList>
        </ListWrapper>
    );
}

const ListWrapper = styled(Box)`
	padding-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin: 20px 0;
`;
const RoomList = styled(Box)`
    margin-top:20px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
`;

export default List;