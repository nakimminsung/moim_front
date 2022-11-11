import React, {useEffect, useState} from 'react';
import TopMenu from './TopMenu';
import BottomMenu from './BottomMenu';
import Title from './Title';
import List from './/List';
import Content from './Content';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Map(props) {
	const [data, setData] = useState('');
	const {num} = useParams();

	const selectTheme = () => {
		let url = localStorage.url + '/theme/data?num=' + num;
		axios.get(url).then((res) => setData(res.data));
	};

	useEffect(() => {
		selectTheme();
	}, []);

	return (
		<Wrapper>
			<Top>
				<Title data={data} />
				<MenuDiv>
					<TopMenu />
				</MenuDiv>
			</Top>
			<Bottom>
				<ListDiv>
					<List />
				</ListDiv>
				<ContentDiv>
					<BottomMenu />
					<Content />
				</ContentDiv>
			</Bottom>
		</Wrapper>
	);
}

export default Map;

const Wrapper = styled(Box)``;
const Top = styled(Box)`
	height: 16vh;
	position: fixed;
	top: 0;
	z-index: 15;
	background-color: white;
	border-bottom: #f0f0f0;
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: #f5f5f5;
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
