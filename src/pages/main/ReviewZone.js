import {Rating} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {red} from '@material-ui/core/colors';

//스타일 컴포넌트 관련
import styled from '@emotion/styled/macro';
import {Box, Typography} from '@mui/material';
import ReviewTag from './ReviewTag';

function ReviewZone(props) {
	const [review, setReview] = useState('');

	//db의 src가 톰캣일때
	const imgUrl = 'http://localhost:9000/image/';

	//리뷰 리스트 가져오기
	const getReviewList = () => {
		let url = localStorage.url + '/reviewList';

		axios.get(url).then((res) => {
			var s = res.data;
			// console.log(s);
			setReview(s);
		});
	};

	useEffect(() => {
		//getReviewList
		getReviewList();
	}, []);

	//공간 클릭 시 상세페이지로 이동되도록
	const navi = useNavigate();

	const useStyles = makeStyles((theme) => ({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	}));

	const classes = useStyles();

	// 더보기 more button 관련
	const max = 3;
	const [now, setNow] = useState(1);

	// 더보기 button event
	const moreButton = () => {
		setNow(now + 1);
	};

	return (
		<div className='reviewArea' style={{marginTop: '40px'}}>
			<div style={{textAlign: 'center'}}>
				<h2>
					<b>리뷰 ZONE</b>
				</h2>
				<span
					style={{color: 'gray', fontWeight: '500', fontSize: '16px'}}
				>
					이용자들의 생생한 후기를 만나보세요!
				</span>
			</div>

			{/* 리스트 전체 div */}
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					marginTop: '40px',
				}}
			>
				{review &&
					review.map((data, idx) => (
						<>
							{idx < max * now ? (
								<Card
									className={classes.root}
									style={{
										width: '30%',
										height: '390px',
										padding: '10px',
										marginBottom: '30px',
										border: '1px solid lightgray',
										cursor: 'pointer',
									}}
									key={idx}
									onClick={() => {
										navi('/detail/' + data.roomNum);
									}}
								>
									{/* 태그 출력 */}
									<div>
										<ReviewTag num={data.roomNum} />
									</div>
									<b style={{fontSize: '1.3em'}}>
										{data.roomName.length > 11
											? data.roomName.substr(0, 16) +
											  '...'
											: data.roomName}

										{/* {data.roomName} */}
									</b>
									<br />

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<div>
											<span
												style={{
													color: 'gray',
													fontSize: '16px',
												}}
											>
												별점
											</span>
											&nbsp;
											<Rating
												name='half-rating-read'
												style={{
													color: '#704de4',
													fontSize: '18px',
													position: 'relative',
													top: '3px',
												}}
												value={data.rating}
												precision={1}
												readOnly
											/>
										</div>
										<div style={{fontSize: '16px'}}>
											<b
												style={{
													color: '#6f42c1',
													fontSize: '16px',
												}}
											>
												{data.weekAmPrice.toLocaleString(
													'ko-KR',
												)}{' '}
											</b>
											<span
												style={{
													color: 'gray',
												}}
											>
												원/시간
											</span>
										</div>
									</div>

									<div
										style={{
											marginTop: '10px',
											border: '1px solid lightgray',
										}}
									>
										<CardMedia
											className={classes.media}
											image={
												//null 일 떄
												data.reviewImageUrl == null
													? ''
													: //http로 시작할 때
													data.reviewImageUrl.startsWith(
															'http',
													  )
													? data.reviewImageUrl
													: // src DB가 파일명 일떄
													  imgUrl +
													  data.reviewImageUrl
											}
										/>
									</div>

									<div style={{marginTop: '15px'}}>
										<span>
											{/* 리뷰 내용 */}

											{/* {data.content} */}
											{data.content.length > 101
												? data.content.substr(0, 102) +
												  '  .......'
												: data.content}
										</span>
									</div>
								</Card>
							) : (
								''
							)}
						</>
					))}

				{parseInt(review.length / max) + 1 !== now ? (
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
			</div>
		</div>
	);
}

export default ReviewZone;

const ViewMoreButton = styled(Typography)`
	border: 1px solid #a0a0a0;
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
