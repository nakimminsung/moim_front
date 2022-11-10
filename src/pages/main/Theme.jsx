import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import styled from '@emotion/styled/macro';
import {Box, Typography} from '@mui/material';

function Theme(props) {
	const [data, setData] = useState([]);
	const [now, setNow] = useState(1);
	const max = 4;
	const navi = useNavigate();

	// theme list select
	const getThemeList = () => {
		let url = localStorage.url + '/main/theme';
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
		console.log(data.length);
	};
	// 더보기 button event
	const moreButton = () => {
		setNow(now + 1);
	};
	useEffect(() => {
		getThemeList();
	}, []);

	return (
		<ThemeWrapper>
			<ThemeTitleWrapper>
				<Title>기획전</Title>
				<SubTitle>지금 딱 내가 찾는 공간!</SubTitle>
			</ThemeTitleWrapper>
			<ThemeListWrapper>
				{data &&
					data.map((item, i) => (
						<>
							{i < max * now ? (
								<ThemeContent
									key={i}
									style={{
										backgroundImage: `url(${item.bannerImage})`,
									}}
									onClick={() => {
										navi('/theme/' + item.num);
									}}
								>
									<ThemeTitle>{item.title}</ThemeTitle>
									<ThemeSubTitle>
										{item.description}
									</ThemeSubTitle>
								</ThemeContent>
							) : (
								''
							)}
						</>
					))}
				{parseInt(data.length / max) + 1 !== now ? (
					<ViewMoreButton
						onClick={() => {
							moreButton();
						}}
					>
						더보기
					</ViewMoreButton>
				) : (
					''
				)}
			</ThemeListWrapper>
		</ThemeWrapper>
	);
}

export default Theme;

const ThemeWrapper = styled(Box)`
	max-width: 1200px;
	margin: 0 auto;
	width: 100%;
`;
const ThemeTitleWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Title = styled(Typography)`
	font-size: 30px;
	display: block;
	text-align: center;
	margin-bottom: 10px;
`;
const SubTitle = styled(Typography)`
	font-size: 15px;
	text-align: center;
	margin-bottom: 30px;
`;
const ThemeListWrapper = styled(Box)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
`;
const ThemeContent = styled(Box)`
	width: 49%;
	height: 150px;
	cursor: pointer;
	opacity: 0.9;
	padding: 20px;
	margin-bottom: 25px;
`;
const ThemeTitle = styled(Typography)`
	display: block;
	font-size: 30px;
	color: white;
	font-weight: 1000;
`;
const ThemeSubTitle = styled(Typography)`
	color: white;
	font-size: 15px;
`;
const ViewMoreButton = styled(Typography)`
	border: 1px solid #a0a0a0;
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
