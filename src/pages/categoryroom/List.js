import { FormControl, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';

function List(props) {
    const { categoryNum } = useParams();
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('readCount desc');

    const getRoomList = () => {
        let url = localStorage.url + '/categoryroomList?categoryNum=' +
            categoryNum +
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
            <SelectDiv>
                <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                    <Select
                        labelId='demo-select-small'
                        id='demo-select-small'
                        value={sort}
                        onChange={optionChange}
                    >
                        <MenuItem value={'readCount desc'}>베스트 공간 순</MenuItem>
                        <MenuItem value={'weekAmPrice asc'}>
                            낮은 가격순
                        </MenuItem>
                        <MenuItem value={'weekAmPrice desc'}>
                            높은 가격순
                        </MenuItem>
                    </Select>
                </FormControl>
            </SelectDiv>
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