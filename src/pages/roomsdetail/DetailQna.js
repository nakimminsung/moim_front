import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import DetailReview from './DetailReview';
import Pagenation from './DetailQnaPage';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import jwt_decode from 'jwt-decode';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';

function DetailQna(props) {
	const navi = useNavigate();
	const {num} = useParams();
	const [qna, setQna] = useState([]);
	const [qnaLength, setQnaLength] = useState(0);
	const contentRef = useRef('');

	//페이징처리
	const [limit, setLimit] = useState(3);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	//모달
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		if (localStorage.getItem('token')) {
			setOpen(true);
		} else {
			alert('로그인해주시기바랍니다');
		}
	};

	const handleClose = () => {
		setOpen(false);
		setQnaLength(0);
	};

	//Qna데이터 가져오기
	const onSelectData = () => {
		let url = localStorage.url + '/detailQna?num=' + num;

		axios.get(url).then((res) => {
			setQna(res.data);
		});
	};

	//Qna 등록
	const insertQna = () => {
		let insertQna = localStorage.url + '/detail/insertQna';
		let userNum = jwt_decode(localStorage.getItem('token')).idx;
		const question = contentRef.current.value;

		if (qnaLength == 0) {
			alert('질문사항 작성해주시기 바랍니다.');
		} else {
			axios.post(insertQna, {question, userNum, num}).then((res) => {
				alert('등록되었습니다');
				contentRef.current.value = '';
				setQnaLength(0);
				window.location.reload();
			});
		}
	};

	useEffect(() => {
		onSelectData(num);
	}, []);

	return (
		<div>
			<div id='5' style={{marginTop: '100px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>
					Q&A <span style={{color: '#704de4'}}>({qna.length}개)</span>
				</b>
				<span className='qnabtn'>
					<Button
						variant='outlined'
						color='primary'
						onClick={handleClickOpen}
						style={{borderRadius: '80px'}}
					>
						<CreateIcon />
						질문 작성하기
					</Button>
				</span>
				{/* 모달창 */}
				<div>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
					>
						<DialogTitle
							id='alert-dialog-title'
							style={{backgroundColor: '#704de4', color: 'white'}}
						>
							{
								<div>
									<span>질문 작성하기</span>
									<span onClick={handleClose}>
										<CloseIcon
											style={{
												float: 'right',
												cursor: 'pointer',
											}}
										/>
									</span>
								</div>
							}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-description'>
								<div
									style={{marginTop: '25px', width: '430px'}}
								>
									<div>
										<b
											style={{
												color: 'black',
												fontSize: '18px',
											}}
										>
											질문
										</b>
										<span style={{float: 'right'}}>
											{qnaLength}/200자
										</span>
									</div>

									<textarea
										maxLength={200}
										placeholder='호스트에게 궁금한 점을 질문해보세요.'
										style={{
											width: ' 430px',
											height: '130px',
											border: '1px solid lightgray',
										}}
										ref={contentRef}
										onChange={(e) => {
											setQnaLength(e.target.value.length);
										}}
									/>

									<div className='qnaInfo'>
										<ErrorOutlineIcon />
										단, 공간 및 예약에 대한 문의가 아닌 글은
										무통보 삭제될 수 있습니다.
									</div>
								</div>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color='primary'>
								취소
							</Button>
							<Button
								onClick={insertQna}
								color='primary'
								autoFocus
							>
								등록
							</Button>
						</DialogActions>
					</Dialog>
				</div>
				{/* Qna 리스트 출력 */}
				{qna.length == 0 ? (
					<div
						style={{
							textAlign: 'center',
							marginTop: '120px',
							height: '150px',
						}}
					>
						<h3>등록된 Q&A가 없습니다.</h3>
					</div>
				) : (
					<div>
						<table className='table' style={{marginTop: '30px'}}>
							<tbody>
								{qna &&
									qna
										.slice(offset, offset + limit)
										.map((item, idx) => (
											<tr key={idx}>
												<td
													style={{
														width: '130px',
													}}
												>
													<img
														alt=''
														src='https://ssl.pstatic.net/static/pwe/address/img_profile.png'
														className='qnaImg'
													/>
												</td>
												<td
													style={{
														verticalAlign: 'middle',
													}}
												>
													<div>
														<b
															style={{
																fontSize:
																	'17px',
															}}
														>
															{item.nickname}
														</b>
														<p>
															<div className='qnaContent'>
																{item.question}
															</div>
															<span className='qnaDay'>
																{item.writeday}
															</span>
														</p>
													</div>

													<div
														style={{
															marginTop: '30px',
															display:
																item.answerday ==
																null
																	? 'none'
																	: 'block',
														}}
													>
														<b
															style={{
																color: '#704de4',
																fontSize:
																	'17px',
															}}
														>
															호스트답글
														</b>
														<pre className='qnaContent'>
															{item.answer}
														</pre>
														<span className='qnaDay'>
															{item.answerday}
														</span>
													</div>
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				)}
				{qna.length === 0 ? (
					''
				) : (
					<div>
						<Pagenation
							total={qna.length}
							limit={limit}
							page={page}
							setPage={setPage}
						/>
					</div>
				)}
			</div>
			<DetailReview />
		</div>
	);
}

export default DetailQna;
