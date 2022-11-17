import React, { useEffect, useState } from 'react';
import FilterMenu from './FilterMenu';
import Title from './Title';
import List from './List';
import Content from './Content';
import styled from '@emotion/styled/macro';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryMap(props) {
    const [categoryData, setCategoryData] = useState('');
    const [roomData, setRoomData] = useState([]);
    const [sort, setSort] = useState('readCount desc');
    const [roomName, setRoomName] = useState('');
    const [headCount, setHeadCount] = useState('');
    const [address, setAddress] = useState('');
    const { categoryNum } = useParams();

    // 해당 카테고리 정보 추출
    const categoryList = () => {
        let url = localStorage.url + '/category/data?categoryNum=' + categoryNum;
        axios.get(url).then((res) => setCategoryData(res.data));
    };
    // 해당 카테고리 공간 리스트 반환
    const categoryRoomList = () => {
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
            roomName;
        axios.get(url).then((res) => setRoomData(res.data));
        console.log(roomData);
    };

    useEffect(() => {
        categoryList();
        categoryRoomList();
    }, [sort, roomName, address, headCount]);

    return (
        <Wrapper>
            <Top>
                {/* 타이틀 컴포넌트 (카테고리 이름)  */}
                <Title categoryData={categoryData} />
                {/* 필터 메뉴 컴포넌트 */}
                <MenuDiv>
                    <FilterMenu
                        roomName={roomName}
                        setRoomName={setRoomName}
                        address={address}
                        setAddress={setAddress}
                        headCount={headCount}
                        setHeadCount={setHeadCount}
                        roomData={roomData}
                        sort={sort}
                        setSort={setSort}
                    />
                </MenuDiv>
            </Top>
            <Bottom>
                {/* 리스트 컴포넌트(해당 카테고리 방 리스트) */}
                <ListDiv>
                    <List roomData={roomData} />
                </ListDiv>
                {/* 지도 내용 컴포넌트 */}
                <ContentDiv>
                    <Content roomData={roomData} />
                </ContentDiv>
            </Bottom>
        </Wrapper>
    );
}

export default CategoryMap;

const Wrapper = styled(Box)``;
const Top = styled(Box)`
	height: 16vh;
	position: fixed;
	top: 0;
	z-index: 15;
	background-color: white;
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: #fff;
`;
const MenuDiv = styled(Box)`
	padding: 10px;
`;
const Bottom = styled(Box)`
	display: flex;
	justify-content: space-between;
	height: 100%;
	padding-top: 16vh;
`;
const ListDiv = styled(Box)`
	@media (max-width: 1920px) {
		width: 20%;
	}
	@media (max-width: 1680px) {
		width: 25%;
	}
	@media (max-width: 767px) {
		width: 45%;
	}
	height: 84vh;
`;
const ContentDiv = styled(Box)`
	@media (max-width: 1920px) {
		width: 80%;
	}
	@media (max-width: 1680px) {
		width: 75%;
	}
	@media (max-width: 767px) {
		width: 55%;
	}
	height: 84vh;
	position: fixed;
	right: 0;
	top: 15vh;
`;
