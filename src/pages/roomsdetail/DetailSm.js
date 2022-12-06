import {Box} from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import SmCard from './SmCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled/macro';

function DetailSm(props) {
	const {num} = useParams();
	const [randomData, setRandomData] = useState([]);

	const selectRandomPlace = () => {
		let url = localStorage.url + '/detailRandomPlace?num=' + num;
		axios.get(url).then((res) => {
			setRandomData(res.data);
		});
	};

	useEffect((e) => {
		selectRandomPlace(num);
	}, []);

	return (
		<ListWrapper>
			<div style={{width: '100%', marginBottom: '30px'}}>
				<b
					style={{
						borderBottom: '2px solid #ffd014',
						fontSize: '18px',
						paddingBottom: '5px',
					}}
				>
					추천공간
				</b>
			</div>
			<RoomList>
				{randomData &&
					randomData.map((item, i) => (
						<SmCard
							randomData={item}
							key={i}
							randomNum={item.num}
						/>
					))}
			</RoomList>
		</ListWrapper>
	);
}

export default DetailSm;
const ListWrapper = styled(Box)`
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 100px;
`;

const RoomList = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
`;
