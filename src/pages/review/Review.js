import styled from '@emotion/styled/macro';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box, DialogContent, DialogContentText} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import {
	Card,
	CardActionArea,
	CardContent,
	Dialog,
	DialogActions,
	DialogTitle,
	Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {set} from 'date-fns';

function Review(props) {
	const [memberReviewList, setMemberReviewList] = useState([]);
	const [sort, setSort] = useState('order by writeday desc');
	const [rating, setRating] = useState(''); // 별점
	const [content, setContent] = useState('');
	const [uploadFile, setUploadFile] = useState('');
	const [num, setNum] = useState('');
	const [contentLength, setContentLength] = useState(0);
	const [review, setReview] = useState('');
	const [oldPhoto, setoldPhoto] = useState('');

	const imgUrl = 'http://localhost:9000/image/';

	// theme의 space list select
	const selectReviewList = () => {
		let userNum = jwt_decode(localStorage.getItem('token')).idx;
		let url =
			localStorage.url +
			'/reviewQna/reviewList?userNum=' +
			userNum +
			'&sort=' +
			sort;

		axios.get(url).then((res) => setMemberReviewList(res.data));
	};
	//정렬순
	const handleChange = (e) => {
		setSort(e.target.value);
	};

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);

		//값 비워주기
		setRating('');
		setUploadFile([]);
		setNum('');
		setContent('');
	};

	// 내용 수정
	const contentHandler = (e) => {
		e.preventDefault();
		setContentLength(e.target.value.length);
		setContent(e.target.value);
	};
	//사진 수정
	const uploadFileHandler = (e) => {
		e.preventDefault();
		setUploadFile(e.target.files[0]);
	};

	//수정
	const submitHandler = (e) => {
		e.preventDefault();
		// BackEnd로 보낼 url
		let updateUrl = localStorage.url + '/reviewUpdate';
		console.log(updateUrl);
		//formData로 한번에 보내기
		const updateReviewData = new FormData();
		updateReviewData.append('content', content);
		updateReviewData.append('rating', rating);
		updateReviewData.append('uploadFile', uploadFile);
		updateReviewData.append('num', num);
		updateReviewData.append('oldPhoto', oldPhoto);

		for (let key of updateReviewData.keys()) {
			console.log(key, ':', updateReviewData.get(key));
		}

		//url로 body 데이터를 보낸다
		axios({
			method: 'post',
			url: updateUrl, //BackEnd로 보낼 url
			data: updateReviewData,
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res) => {
			console.log('res.data=' + res.data);
			alert('등록이 완료되었습니다.');

			//성공하고 비워주기
			setRating('');
			setUploadFile([]);
			setContent('');
			setoldPhoto('');
		});

		//성공하고 modal 창 닫기
		setOpen(false);
	};

	//삭제
	const deleteReview = () => {
		let deleteUrl = localStorage.url + '/reviewDelete?num=' + num;
		axios.delete(deleteUrl).then((res) => {
			alert('삭제되었습니다');
			window.location.reload();
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		selectReviewList();
	}, [sort]);

	return (
		<ListWrapper>
			<SelectDiv>
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
					{memberReviewList.length == 0 ? (
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
					) : (
						memberReviewList &&
						memberReviewList.map((item, index) => (
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
														'http://localhost:3000/detail/' +
														item.roomNum;
												}}
											>
												{item.num}
											</span>
										</Typography>
										<Typography
											variant='body1'
											component='div'
											color='text.secondary'
											style={{marginTop: '25px'}}
										>
											<Space>
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
												<pre style={{height: '50px'}}>
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
														imgUrl +
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
									<div style={{textAlign: 'center'}}>
										<Button
											variant='contained'
											style={{
												background: '#704de4',
												color: 'white',
												width: '95%',
												marginBottom: '20px',
												height: '40px',
											}}
											onClick={() => {
												setOpen(true);
												setNum(item.num);
												let selectUrl =
													localStorage.url +
													'/reviewMember?num=' +
													item.num;

												axios
													.get(selectUrl)
													.then((res) => {
														setReview(res.data);
														setRating(
															res.data.rating,
														);
														setContent(
															res.data.content,
														);
														setoldPhoto(
															res.data
																.reviewImageUrl,
														);
														setContentLength(
															res.data.content
																.length,
														);
													});
											}}
										>
											수정/삭제
										</Button>
									</div>
								</CardActionArea>
							</Card>
						))
					)}
				</CardWrapper>
			</ReviewList>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle
					style={{
						backgroundColor: '#704de4',
						color: 'white',
						textAlign: 'center',
					}}
				>
					이용후기 작성
					<span onClick={handleClose}>
						<CloseIcon
							style={{
								float: 'right',
								cursor: 'pointer',
								marginTop: '5px',
							}}
						/>
					</span>
				</DialogTitle>
				<DialogContent>
					<br />
					<DialogContentText style={{width: '350px'}}>
						평점
						<Rating
							name='simple-controlled'
							style={{
								marginLeft: '30px',
							}}
							value={rating}
							onChange={(event, newValue) => {
								setRating(newValue);
							}}
						/>
					</DialogContentText>

					<div>
						<span style={{float: 'right'}}>
							{contentLength}/200자
						</span>
					</div>
					<textarea
						className='form-control'
						placeholder='이용후기를 작성해주세요.'
						style={{height: '150px'}}
						onChange={contentHandler}
						value={content}
						maxLength={200}
					/>
					<DialogContentText style={{color: 'red', fontSize: '12px'}}>
						<ErrorOutlineIcon />
						이용완료일 기준 30일 이내까지 작성 및 수정하실 수
						있습니다.
					</DialogContentText>
					<br />
					<input
						type={'file'}
						className='form-control'
						onChange={uploadFileHandler}
					/>
					<DialogContentText style={{color: 'red', fontSize: '12px'}}>
						<ErrorOutlineIcon />
						운영정책과 맞지 않는 이미지 업로드시 무통보 삭제 될 수
						있습니다.
					</DialogContentText>
					<DialogActions
						style={{
							marginTop: '20px',
							width: '100%',
							textAlign: 'center',
						}}
					>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={deleteReview}
							style={{width: '50%', height: '40px'}}
						>
							삭제
						</button>
						&nbsp;&nbsp;
						<button
							type='submit'
							className='btn btn-dark'
							onClick={submitHandler}
							style={{width: '50%', height: '40px'}}
						>
							수정
						</button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</ListWrapper>
	);
}

export default Review;
const ListWrapper = styled(Box)`
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-bottom: 20px;
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
	font-weight: bold;
`;
const SpaceContent = styled(Typography)``;
const SpaceWriteday = styled(Typography)`
	color: #b2b2b2;
	font-size: 13px;
	margin-top: 10px;
`;
