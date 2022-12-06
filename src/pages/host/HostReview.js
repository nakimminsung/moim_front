import styled from '@emotion/styled/macro';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import {Card, CardActionArea, CardContent, Typography} from '@material-ui/core';

function HostReview(props) {
	const [hostReviewList, setHostReviewList] = useState([]);
	const [sort, setSort] = useState('order by writeday desc');

	const imgUrl = 'http://localhost:9000/image/';

	//전체 리뷰 가져오기
	const selectReviewList = () => {
		const hostNum = sessionStorage.num;
		let url =
			localStorage.url +
			'/reviewQna/reviewHostList?hostNum=' +
			hostNum +
			'&sort=' +
			sort;

		axios.get(url).then((res) => setHostReviewList(res.data));
	};
	//정렬순
	const handleChange = (e) => {
		setSort(e.target.value);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		selectReviewList();
	}, [sort]);

	return (
		<ListWrapper>
			<SelectDiv>
				{hostReviewList.length == 0 ? (
					<span className='memberCount'></span>
				) : (
					<span className='memberCount'>
						총 {hostReviewList.length}개
					</span>
				)}

				<FormControl sx={{m: 1, minWidth: 120}} size='small'>
					<Select
						labelId='demo-select-small'
						id='demo-select-small'
						value={sort}
						onChange={handleChange}
					>
						<MenuItem value={'order by writeday desc'}>
							최신순
						</MenuItem>
						<MenuItem value={'order by writeday asc'}>
							과거순
						</MenuItem>
					</Select>
				</FormControl>
			</SelectDiv>
			<ReviewList>
				<CardWrapper>
					{hostReviewList.length == 0 ? (
						<Wrapper>
							<h5
								style={{
									height: '300px',
									width: '100%',
									lineHeight: '300px',
									textAlign: 'center',
								}}
							>
								<b>현재 등록된 이용후기가 없습니다.</b>
							</h5>
						</Wrapper>
					) : (
						hostReviewList &&
						hostReviewList.map((item, index) => (
							<Card style={{width: '100%'}}>
								<CardActionArea>
									<CardContent style={{cursor: 'auto'}}>
										<Typography
											gutterBottom
											component='div'
											style={{
												fontWeight: 'bold',
												borderBottom:
													'1px solid #7b68ee',
												paddingBottom: '10px',
											}}
										>
											예약번호 :
											<span
												style={{
													textDecoration: 'underline',
													color: '#7b68ee',
													cursor: 'pointer',
												}}
												onClick={() => {
													window.location.href =
														'http://localhost:3000/host/bookingdetail/' +
														item.num;
												}}
											>
												{item.num}
											</span>
										</Typography>
										<Typography
											variant='body1'
											component='div'
											color='text.secondary'
											style={{marginTop: '15px'}}
										>
											<Space
												style={{
													fontWeight: 'bold',
													marginBottom: '10px',
												}}
											>
												공간명 :{' '}
												<span
													style={{
														textDecoration:
															'underline',
														color: '#7b68ee',
														cursor: 'pointer',
													}}
													onClick={() => {
														window.location.href =
															'http://localhost:3000/detail/' +
															item.roomNum;
													}}
												>
													{item.name}
												</span>
											</Space>

											<Space>
												작성자 :
												<span>
													&nbsp;{item.nickname}
												</span>
											</Space>
											<Rating
												name='half-rating-read'
												style={{
													color: '#704de4',
													paddingTop: '5px',
												}}
												value={item.rating}
												precision={1}
												readOnly
											/>
											<SpaceContent>
												<pre
													style={{
														height: '60px',
														fontFamily:
															'NanumSquareRound',
													}}
												>
													{item.content}
												</pre>
											</SpaceContent>
											<ImageDiv>
												<ImageBox
													component='img'
													sx={{
														height: '150px',
														display: 'block',
														overflow: 'hidden',
														width: '40%',
													}}
													id='image'
													src={
														item.reviewImageUrl ==
														null
															? 'https://github.com/MoiM-Project/data/blob/main/icon/%EC%BA%A1%EC%B2%98.JPG?raw=true'
															: item.reviewImageUrl.startsWith(
																	'http',
															  )
															? item.reviewImageUrl
															: imgUrl +
															  item.reviewImageUrl
													}
													alt={item.label}
												/>
											</ImageDiv>
											<SpaceWriteday>
												{item.writeday}
											</SpaceWriteday>
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						))
					)}
				</CardWrapper>
			</ReviewList>
		</ListWrapper>
	);
}

export default HostReview;
const ListWrapper = styled(Box)`
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;
const SelectDiv = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
`;
const ReviewList = styled(Box)`
	// display: grid;
	width: 100%;
`;
const CardWrapper = styled(Typography)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px 20px;
`;
const Wrapper = styled(Typography)`
	grid-column: span 3;
`;

const ImageBox = styled(Box)`
	transform: scale(1);
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	-o-transform: scale(1);
	transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
	:hover {
		transform: scale(1.1);
		-webkit-transform: scale(1.1);
		-moz-transform: scale(1.1);
		-ms-transform: scale(1.1);
		-o-transform: scale(1.1);
	}
`;
const ImageDiv = styled(Box)`
	overflow: hidden;
	text-align: center;
`;
const Space = styled(Typography)`
	font-family: 'NanumSquareRound';
`;
const SpaceContent = styled(Typography)``;
const SpaceWriteday = styled(Typography)`
	color: #b2b2b2;
	font-size: 13px;
	margin-top: 10px;
`;
