import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';

function Theme(props) {
	const [data, setData] = useState([]);
	const [now, setNow] = useState(1);
	const max = 4;
	const navi = useNavigate();

	// theme list select
	const getThemeList = () => {
		let url = localStorage.url + '/main/theme';
		axios.get(url).then((res) => setData(res.data));
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
	margin: 0 auto;
	width: 100%;
`;
const ThemeTitleWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Title = styled.b`
	display: block;
	text-align: center;
	font-size: 30px;
`;
const SubTitle = styled.b`
	color: gray;
	text-align: center;
	margin-bottom: 30px;
	font-size: 16px;
`;
const ThemeListWrapper = styled(Box)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
`;
const ThemeContent = styled(Box)`
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: top;
	height: 150px;
	cursor: pointer;
	opacity: 0.9;
	padding: 20px;
	margin-bottom: 25px;
	@media (max-width: 1920px) {
		width: 49%;
	}
	@media (max-width: 1680px) {
		width: 49%;
	}
	@media (max-width: 1000px) {
		width: 100%;
	}
	@media (max-width: 900px) {
		width: 100%;
	}
`;
const ThemeTitle = styled.span`
	display: block;
	font-size: 30px;
	color: white;
	font-weight: 1000;
`;
const ThemeSubTitle = styled.span`
	color: white;
	font-size: 15px;
`;
const ViewMoreButton = styled.span`
	border: 1px solid #a0a0a0;
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
