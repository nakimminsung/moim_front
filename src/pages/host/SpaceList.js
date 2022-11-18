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
	localStorage.url = 'http://localhost:9000';

	let imageUrl = localStorage.url + '/image/';
	const [checked, setChecked] = useState(0);

	// 페이징 처리
	const [spacelist, setSpacelist] = useState([]);
	const [limit, setLimit] = useState(3);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	useEffect(() => {
		let listUrl = localStorage.url + '/host/list';
		// console.log(listUrl);
		fetch(listUrl)
			.then((res) => res.json())
			.then((data) => setSpacelist(data));
		// console.log(checked);
	}, [checked]);

	// console.log(spacelist);

	// const list = () => {
	// 	let listUrl = localStorage.url + '/host/list';
	// 	console.log(listUrl);
	// 	axios.get(listUrl).then((res) => {
	// 		setSpacelist(res.data);
	// 	});
	// };
	// useEffect(() => {
	// 	// setChecked(checked);
	// 	console.log(checked);
	// }, [checked]);

	const updateStaus = (idx, checked) => {
		let statusUrl =
			localStorage.url +
			'/host/status?num=' +
			idx +
			'&hideStatus=' +
			checked;
		console.log(statusUrl);
		// console.log('checked' + checked);
		axios.patch(statusUrl).then((res) => {});
	};

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
						<b style={{color: 'blueviolet'}}>새 공간 등록하기</b>
					</h5>
				</BtnNewAdd>
			</BtnWrap>
			<br />
			<br />
			<div className='spacelist'>
				{spacelist.slice(offset, offset + limit).map((r, i) => (
					<BoxSpace key={i}>
						<Inner>
							<div>
								<ImgBox>
									<Img
										style={{
											backgroundImage: `url(${
												imageUrl + r.thumbnailImage
											})`,
											// `url(${r.thumbnailImage})`,
										}}
									>
										{r.approvalStatus == 0 &&
										r.hideStatus == 0 ? (
											<Close>
												<Em className='label'>
													심사중
												</Em>
											</Close>
										) : r.approvalStatus == 1 &&
										  r.hideStatus == 0 ? (
											<Close>
												<Em className='label'>
													비공개
												</Em>
											</Close>
										) : r.approvalStatus == 1 &&
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
											paddingBottom: '10px',
											borderBottom: '1px solid #ebebeb',
											fontWeight: '700',
										}}
									>
										{r.name}
									</p>
									<StateList>
										<li
											className='date'
											style={{
												display: 'inline-block',
												position: 'relative',
												paddingTop: '6px',
												fontSize: '14px',
												color: '#949494',
											}}
										>
											공간번호 {r.num}
										</li>
										<br />
										<li
											className='date'
											style={{
												display: 'inline-block',
												position: 'relative',
												paddingTop: '6px',
												fontSize: '14px',
												color: '#949494',
											}}
										>
											등록일 {r.writeday}
										</li>
										<Btn>
											<Toggle
												checked={checked}
												setChecked={setChecked}
												updateStaus={updateStaus}
												num={r.num}
											/>
										</Btn>
									</StateList>
								</InfoArea>
								<div
									className='btn_btnarea'
									style={{width: '100%'}}
								>
									<SpaceModify>공간정보 수정</SpaceModify>
									<SpaceDelete
										onClick={() => deleteButton(r.num)}
									>
										삭제
									</SpaceDelete>
								</div>
							</div>
						</Inner>
					</BoxSpace>
				))}
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<div>
				<Pagenation
					total={spacelist.length}
					limit={limit}
					page={page}
					setPage={setPage}
				/>
			</div>
		</RoomList>
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
