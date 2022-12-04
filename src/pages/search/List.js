import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import qs from 'query-string';
import RoomCard from './Card';

function List(props) {
    // 쿼리스트링으로 넘어오는 인자를 받기위해 useLocation 사용
    const searchParams = useLocation().search;
    // location의 search에 쿼리스트링 내용 담겨있음(?searchWord=)
    const query = qs.parse(searchParams);
    // const { searchWord } = location.search;
    const searchWord = new URLSearchParams(searchParams).get('searchWord');
    const { roomData } = props;
    const [data, setData] = useState([]);
    const {
        sort,
        setSort,
    } = props;


    const handleChange = (e) => {
        setSort(e.target.value);
    };

    return (
        <>
            {/* 검색 여부에 따른 삼항 연산자 */}
            <div style={{ marginLeft: '10px', marginTop: '30px', paddingTop: '5px' }}>
                {searchWord !== '' ? (
                    //검색단어 있으면서, 결과가 있을때
                    roomData.length !== 0 ? (
                        <b>
                            '{{ searchWord }.searchWord}' (으)로 검색된 공간 :{' '}
                            {roomData.length} 개
                        </b>
                    ) : (
                        //검색단어 있으면서, 결과가 없을때
                        <b>
                            '{{ searchWord }.searchWord}' (으)로 검색된 공간이
                            없습니다.
                        </b>
                    )
                ) : //삼항 연산자 중첩 시작
                    //검색단어 없으면서, 결과가 있을때
                    roomData.length !== 0 ? (
                        <b>조회된 공간 : {roomData.length} 개</b>
                    ) : (
                        //검색단어 없으면서, 결과가 없을때
                        <b>등록된 공간이 없습니다.</b>
                    )}
            </div>
            <ListWrapper>
                <SelectDiv>
                    <FormControl sx={{ m: 1, minWidth: 110 }} size='small'>
                        <Select
                            labelId='demo-select-small'
                            id='demo-select-small'
                            value={sort}
                            onChange={handleChange}
                            defaultValue={'a.readCount desc'}
                        >
                            <MenuItem value={'a.readCount desc'}>인기순</MenuItem>
                            <MenuItem value={'a.weekAmPrice asc'}>
                                낮은 가격순
                            </MenuItem>
                            <MenuItem value={'a.weekAmPrice desc'}>
                                높은 가격순
                            </MenuItem>
                        </Select>
                    </FormControl>
                </SelectDiv>
            </ListWrapper>
            {/* <hr /> */}
            <RoomList>
                {roomData &&
                    roomData.map((item, i) => (
                        <Card roomData={item} key={i} roomNum={item.num} />
                    ))}
            </RoomList>
        </>
    );
}

const ListWrapper = styled(Box)`
	margin-bottom: -20px;
	padding-Top: 20px;
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
    margin-right:25px;
    padding:5px;
`;
const RoomList = styled(Box)`
    margin-top:20px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
`;

export default List;