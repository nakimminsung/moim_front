import {Box, Button} from '@material-ui/core';
import {Checkbox} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import Toggle from './Toggle';
import {data} from 'autoprefixer';
import Pagenation from './Pagenation';

function SpaceList(props) {
	// 호스트넘버 받아서 보내기
	const hostNum = sessionStorage.num;
	console.log(hostNum);
	localStorage.url = 'http://localhost:9000';

	let imageUrl = localStorage.url + '/image/';

	// 페이징 처리
	const [spacelist, setSpacelist] = useState([]);
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	useEffect(() => {
		let listUrl = localStorage.url + '/host/list';
		// console.log(listUrl);
		fetch(listUrl)
			.then((res) => res.json())
			.then((data) => setSpacelist(data));
		// console.log(checked);
	}, []);

	const [status, setStatus] = useState(false);
	const [roomNum, setRoomNum] = useState('');
	console.log('status=' + status);

	const changeStatus = (num, status) => {
		if (status !== false) {
			setStatus(false);
			setRoomNum(num);
		} else {
			setStatus(true);
			setRoomNum(num);
		}
		console.log(status);
		console.log(roomNum);
		// updateStatus(num, status);
	};

	const updateStatus = () => {
		console.log(status);
		let statusUrl =
			localStorage.url +
			'/host/status?num=' +
			roomNum +
			'&hideStatus=' +
			status;
		console.log(statusUrl);
		axios.patch(statusUrl).then((res) => {
			alert('변경되었습니다');
			// window.location.replace(window.location.href);
			window.history.go(0);
			//window.location.reload(true);
		});
	};
	useEffect(() => {
		updateStatus();
	}, [status, roomNum]);

	const navi = useNavigate();

	const deleteButton = (num) => {
		const deleteUrl = localStorage.url + '/host/delete?num=' + num;
		console.log(num);
		if (window.confirm('정말로 삭제하시겠습니까?')) {
			axios.delete(deleteUrl).then((res) => {
				alert('삭제되었습니다');
				// navi('/host/slist');
				window.location.replace('/host/slist');
			});
		}
	};

	return (
		<div>
			<div style={{height: '100vh'}}>
				<div>
					<RoomList>
						<BtnWrap fullWidth>
							<BtnNewAdd
								variant='outlined'
								fullWidth
								color='primary'
								className='btn_newadd'
								style={{border: '1px solid blueviolet'}}
								onClick={() => navi(`/host/addform`)}
							>
								<h5>
									<b style={{color: 'blueviolet'}}>
										새 공간 등록하기
									</b>
								</h5>
							</BtnNewAdd>
						</BtnWrap>
						<br />
						<br />
						<div className='spacelist'>
							{spacelist
								.slice(offset, offset + limit)
								.map((r, i) => (
									<BoxSpace key={i}>
										<Inner>
											<div>
												<ImgBox>
													<Img
														style={{
															backgroundImage: `url(${
																imageUrl +
																r.thumbnailImage
															})`,
															// `url(${r.thumbnailImage})`,
														}}
													>
														{r.approvalStatus ==
															0 &&
														r.hideStatus == 0 ? (
															<Close>
																<Em className='label'>
																	심사중
																</Em>
															</Close>
														) : r.approvalStatus ==
																1 &&
														  r.hideStatus == 0 ? (
															<Close>
																<Em className='label'>
																	비공개
																</Em>
															</Close>
														) : r.approvalStatus ==
																1 &&
														  r.hideStatus == 1 ? (
															<span></span>
														) : null}
													</Img>
												</ImgBox>
												<InfoArea>
													<p
														className='title_space'
														style={{
															lineHeight: '22px',
															fontSize: '20px',
															paddingBottom:
																'10px',
															borderBottom:
																'1px solid #ebebeb',
															fontWeight: '700',
														}}
													>
														{r.name}
													</p>
													<StateList>
														<li
															className='date'
															style={{
																display:
																	'inline-block',
																position:
																	'relative',
																paddingTop:
																	'6px',
																fontSize:
																	'14px',
																color: '#949494',
															}}
														>
															공간번호 {r.num}
														</li>
														<br />
														<li
															className='date'
															style={{
																display:
																	'inline-block',
																position:
																	'relative',
																paddingTop:
																	'6px',
																fontSize:
																	'14px',
																color: '#949494',
															}}
														>
															등록일 {r.writeday}
														</li>
														<Btn>
															{r.approvalStatus ==
																0 &&
															r.hideStatus ==
																0 ? (
																<button
																	type='button'
																	className='btn btn-danger'
																	value={
																		r.num
																	}
																	disabled
																>
																	심사중
																</button>
															) : r.approvalStatus ==
																	1 &&
															  r.hideStatus ==
																	1 ? (
																<button
																	type='button'
																	className='btn btn-primary'
																	value={
																		r.num
																	}
																	// onChange={() =>
																	// 	changeStatus
																	// }
																	onClick={() =>
																		changeStatus(
																			r.num,
																			r.hideStatus,
																		)
																	}
																>
																	공개중
																</button>
															) : r.approvalStatus ==
																	1 &&
															  r.hideStatus ==
																	0 ? (
																<button
																	type='button'
																	className='btn btn-success'
																	value={
																		r.num
																	}
																	// onChange={() =>
																	// 	changeStatus
																	// }
																	onClick={() =>
																		changeStatus(
																			r.num,
																			r.hideStatus,
																		)
																	}
																	// onClick={() =>
																	// 	updateStatus(
																	// 		r.num,
																	// 		status,
																	// 	)
																	// }
																>
																	비공개
																</button>
															) : null}
														</Btn>
													</StateList>
												</InfoArea>
												<div
													className='btn_btnarea'
													style={{width: '100%'}}
												>
													<SpaceModify
														onClick={() =>
															navi(
																'/host/updateform/' +
																	r.num,
															)
														}
													>
														공간정보 수정
													</SpaceModify>
													<SpaceDelete
														onClick={() =>
															deleteButton(r.num)
														}
													>
														삭제
													</SpaceDelete>
												</div>
											</div>
										</Inner>
									</BoxSpace>
								))}
						</div>
					</RoomList>
				</div>
			</div>
			<div>
				<Pagenation
					total={spacelist.length}
					limit={limit}
					page={page}
					setPage={setPage}
				/>
			</div>
		</div>
	);
}

export default SpaceList;

const RoomList = styled.div`
	background-color: #efefef;
`;
const BtnWrap = styled(Box)`
	display: flex;
	justify-content: center;
`;
const BtnNewAdd = styled(Button)`
	width: 850px;
	height: 60px;
`;

const BoxSpace = styled.div`
	background-color: #efefef;
	float: left;
	margin-bottom: 30px;
	padding: 0 13px;
	width: 33.3%;
	margin-top: 0;
`;

const Inner = styled.div`
	background: #ffffff;
`;

const ImgBox = styled.div`
	vertical-align: middle;
	display: block;
	position: relative;
	overflow: hidden;
	padding-top: 55%;
`;

const Img = styled.span`
	vertical-align: top;
	background-size: cover;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const InfoArea = styled.div`
	padding: 18px 20px 35px;
`;

const StateList = styled.ul`
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	vertical-align: middle;
	position: relative;
	padding-top: 10px;
`;

const Btn = styled.li`
	text-align: center;
	font-size: 14px;
	position: absolute;
	right: 0;
	padding-top: 0;
	top: 11px;
`;

const SpaceModify = styled.span`
	cursor: pointer;
	display: block;
	float: left;
	background-color: #704de4;
	text-align: center;
	color: #fff;
	height: 40px;
	padding: 6px 0 15px;
	width: 50%;
`;

const SpaceDelete = styled.span`
	cursor: pointer;
	display: block;
	float: left;
	background-color: red;
	text-align: center;
	color: #fff;
	height: 40px;
	padding: 5px 0 15px;
	width: 50%;
`;

const Close = styled.span`
	display: table;
	width: 102%;
	height: 102%;
	background: rgba(0, 0, 0, 0.6);
	color: #fff;
	text-align: center;
	z-index: 0;
	font-size: 17px;
`;

const Em = styled.em`
	display: table-cell;
	vertical-align: middle;
`;
