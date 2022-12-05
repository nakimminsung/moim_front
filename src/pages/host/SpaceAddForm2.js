import {Button, Checkbox} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import SpaceImages from './SpaceImages';
import SpaceInfo from './SpaceInfo';
import SpaceOption from './SpaceOption';
import SpaceTag from './SpaceTag';
import SpaceWarning from './SpaceWarning';
import styled from 'styled-components';
import './SpaceAddForm2.css';

function SpaceAddForm2(props) {
	const {num} = useParams();
	const navi = useNavigate();
	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';

	//룸 넘버
	const roomNum = num;

	// 카테고리 체크박스 (체크된 카테고리의 번호를 담을 배열)
	const [checkedArr, setCheckedArr] = useState([]);

	// 카테고리 배열
	const [categorylist, setCategoryList] = useState([]);
	// 메인카테고리 배열
	const [maincategorylist, setMainCategoryList] = useState([]);

	// 카테고리 리스트 호출
	const clist = () => {
		let clistUrl = localStorage.url + '/host/categoryList';
		axios.get(clistUrl).then((res) => {
			setCategoryList(res.data);
		});
	};
	useEffect(() => {
		clist();
	}, []);

	// 메인 카테고리 리스트 호출
	const mclist = () => {
		let mclistUrl = localStorage.url + '/host/maincategoryList';
		axios.get(mclistUrl).then((res) => {
			setMainCategoryList(res.data);
		});
	};
	useEffect(() => {
		mclist();
	}, []);

	//카테고리 체크박스 이벤트
	const handleSingleCheck = (checked, num) => {
		if (checked) {
			// 단일 선택 시 체크된 아이템을 배열에 추가
			setCheckedArr((prev) => [...prev, num]);
			console.log(checkedArr, roomNum);
		} else if (!checked) {
			// 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
			setCheckedArr(checkedArr.filter((el) => el !== num));
			console.log(checkedArr, roomNum);
		} else {
		}
	};

	// 태그 담을 배열
	const [tname, setTag] = useState([]);
	console.log(tname);
	//태그 버튼 이벤트
	const onchange1 = () => {
		if (document.getElementById('tag').value.trim() == '') {
			return;
		}
		setTag(
			tname.concat(
				document.getElementById('tag').value.replace(/(\s*)/g, ''),
			),
		);
		document.getElementById('tag').value = '';
	};
	//태그 엔터 이벤트
	const onchange2 = (e) => {
		if (e.key === 'Enter') {
			if (document.getElementById('tag').value.trim() == '') {
				return;
			}
			setTag(
				tname.concat(
					document.getElementById('tag').value.replace(/(\s*)/g, ''),
				),
			);
			document.getElementById('tag').value = '';
		}

		e.preventDefault();
	};

	// 인포 담을 배열
	const [icontent, setInfo] = useState([]);
	console.log(icontent);
	//인포 버튼 이벤트
	const onchange3 = () => {
		setInfo(icontent.concat(document.getElementById('info').value.trim()));
		document.getElementById('info').value = '';
	};
	//인포 엔터 이벤트
	const onchange4 = (e) => {
		if (e.key === 'Enter') {
			setInfo(
				icontent.concat(document.getElementById('info').value.trim()),
			);
			document.getElementById('info').value = '';
			e.preventDefault();
		}
	};

	// 주의사항 담을 배열
	const [pcontent, setPrecautions] = useState([]);
	console.log(pcontent);
	//주의사항 버튼 이벤트
	const onchange5 = () => {
		setPrecautions(
			pcontent.concat(
				document.getElementById('precautions').value.trim(),
			),
		);
		document.getElementById('precautions').value = '';
	};
	//인포 엔터 이벤트
	const onchange6 = (e) => {
		if (e.key === 'Enter') {
			setPrecautions(
				pcontent.concat(
					document.getElementById('precautions').value.trim(),
				),
			);
			document.getElementById('precautions').value = '';
			e.preventDefault();
		}
	};

	// 옵션 담을 배열
	const [roptionList, setRoptionList] = useState([]);
	// 옵션 네임
	const NameRef = React.useRef('');
	// 옵션 가격
	const PriceRef = React.useRef('');
	// 옵션 이미지
	const [oimageUrl, setOimageUrl] = useState('');
	const [onload, setOnload] = useState(false);

	//옵션 이미지 업로드 이벤트
	const photoUploadEvent3 = (e) => {
		const uploadFile = e.target.files[0];
		let uploadUrl2 = localStorage.url + '/host/optionimage';
		const imageFile = new FormData();
		imageFile.append('uploadFile', uploadFile); //백엔드 컨트롤러에서 MultipartUpload uploadFile 과 일치해야함
		console.log(uploadFile);
		setOnload(true);

		axios({
			method: 'post',
			url: uploadUrl2,
			data: imageFile,
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res) => {
			//파라미터를 res가 받고(response 를 뜻함) String으로 보냈음(Public String)

			//스프링에서 map이 아닌 String으로 업로드한 파일명을 리턴했으므로 res가 곧 파일명임
			setOimageUrl(res.data);
		});
	};

	//옵션 row 추가
	const optionButton = (e) => {
		e.preventDefault();
		let oname = NameRef.current.value;
		let price = PriceRef.current.value;
		console.log(roptionList);
		setRoptionList(
			roptionList.concat({
				oname,
				price,
				oimageUrl,
				roomNum,
			}),
		);
		NameRef.current.value = '';
		PriceRef.current.value = '';
		setOimageUrl('');
		setOnload(false);
	};

	// 방 이미지 담을 배열
	const [rimageUrl, setRoomImage] = useState([]);
	//사진 업로드 이벤트
	const photoUploadEvent2 = (e) => {
		let uploadUrl = localStorage.url + '/host/photolistupload';
		// console.log(e.target.files.length + '개');
		const uploadFile = new FormData();
		for (let i = 0; i < e.target.files.length; i++) {
			uploadFile.append('uploadFile', e.target.files[i]);
		}

		axios({
			method: 'post',
			url: uploadUrl,
			data: uploadFile,
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res) => {
			// console.log(res.data.length + '개 들어옴');
			setRoomImage(rimageUrl.concat(res.data)); // res.data에 배열에 업로드된 사진이름이 배열 형태로 리턴
			// setRoomArray(roomArray.concat(res.data));
		});
	};

	//취소 버튼 클릭 이벤트
	const cancelButton = () => {
		const cancelUrl = localStorage.url + '/host/cancel?num=' + num;
		axios.delete(cancelUrl).then((res) => {
			navi('/host/addform');
		});
	};

	// 다음 버튼 클릭 이벤트
	const nextButton = (e) => {
		e.preventDefault();
		//옵션 저장
		let optioninsertUrl = localStorage.url + '/host/optioninsert';
		console.log(optioninsertUrl);
		// let oname = NameRef.current.value;
		// let price = PriceRef.current.value;
		console.log('roptionList' + roptionList);
		console.log(roptionList);
		console.log(roomNum);
		axios
			.post(optioninsertUrl, {
				roptionList,
			})
			.then((res) => {});

		// //이미지 저장
		let imagesSaveUrl = localStorage.url + '/host/roomimages';
		axios
			.post(imagesSaveUrl, {
				roomNum,
			})
			.then((res) => {});

		let insert2Url = localStorage.url + '/host/insert2';
		// console.log(insert2Url);

		console.log('checkedArr=' + checkedArr);
		console.log(checkedArr);
		console.log('roomNum=' + roomNum);
		console.log(roomNum);

		axios
			.post(insert2Url, {
				categoryNum: checkedArr,
				roomNum,
				tname,
				icontent,
				pcontent,
			})
			.then((res) => {
				console.log(res);
				navi(`/host/addform3/${res.data}`);
			});
	};

	return (
		<div>
			<form onSubmit={nextButton}>
				<div>
					<div
						className='input-group'
						style={{
							position: 'relative',
							width: '100%',
							borderBottom: '3px solid #704de4',
							borderBottomWidth: '4px',
							fontSize: '16px',
							lineHeight: '20px',
							paddingBottom: '26px',
						}}
					>
						<h3
							style={{
								fontSize: '26px',
								lineHeight: '26px',
								fontWeight: '400',
							}}
						>
							공간 정보를 입력해주세요.
						</h3>
						<span
							style={{
								verticalAlign: 'top',
								position: 'absolute',
								color: '#656565',
								right: '0',
								lineHeight: '14px',
								fontSize: '16px',
								top: '1px',
							}}
						>
							<span
								style={{verticalAlign: 'top', color: '#ff3a48'}}
							>
								<IcoRequired>*</IcoRequired> 필수입력
							</span>
						</span>
					</div>
					{/* ---------------유형--------------- */}

					<Space>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							공간유형
						</span>
						<IcoRequired>*</IcoRequired>
						<div className='row'>
							<table>
								<tbody>
									{maincategorylist &&
										maincategorylist.map((mc, idx) => (
											<tr>
												<th
													className='depth_1'
													key={idx}
												>
													<span>{mc.mcname}</span>
													<span className='pointer'></span>
												</th>
												{categorylist &&
													categorylist.map((c, idx) =>
														mc.num ===
														c.mainCategoryNum ? (
															<td
																key={idx}
																className='depth_2'
															>
																<label
																	className={
																		checkedArr.includes(
																			c.num,
																		)
																			? 'selected'
																			: ''
																	}
																	style={{
																		cursor: 'pointer',
																	}}
																>
																	<span>
																		<Checkbox
																			style={{
																				display:
																					'none',
																			}}
																			inputProps={{
																				'aria-label':
																					'uncontrolled-checkbox',
																			}}
																			name='space'
																			onClick={(
																				e,
																			) =>
																				handleSingleCheck(
																					e
																						.target
																						.checked,
																					c.num,
																				)
																			}
																			checked={
																				checkedArr.includes(
																					c.num,
																				)
																					? true
																					: false
																			}
																		/>
																		{
																			c.cname
																		}
																	</span>
																</label>
															</td>
														) : null,
													)}
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</Space>
					{/* ---------------사진--------------- */}
					<Space>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							방에 대한 사진을 등록해주세요
						</span>
						<IcoRequired>*</IcoRequired>
						<SpaceImages
							roomNum={roomNum}
							photoUploadEvent2={photoUploadEvent2}
						/>
						<div
							className='previewimg'
							style={{
								width: '100%',
								border: '1px solid black',
								backgroundColor: '#d3d3d3',
								minHeight: '200px',
								height: 'auto',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								flexWrap: 'wrap',
								position: 'relative',
							}}
						>
							{rimageUrl &&
								rimageUrl.map((room, idx) => (
									<>
										<div
											style={{
												width: '20%',
												height: '230px',
												position: 'relative',
											}}
										>
											<img
												alt=''
												src={`${imageUrl}${room}`}
												className='roomImge'
												style={{
													width: '100%',
													height: '100%',
												}}
											/>

											<CloseOutlined
												className='close'
												style={{
													cursor: 'pointer',
													width: '30px',
													height: '30px',
													border: '1px solid transparent',
													backgroundColor: 'f6f6f6',
													position: 'absolute',
													zIndex: '1',
													right: '0',
												}}
												onClick={() => {
													const delUrl =
														localStorage.url +
														'/host/delphoto?idx=' +
														idx;
													axios
														.get(delUrl)
														.then((res) => {
															//DB는 삭제되지 않음
														});

													setRoomImage(
														rimageUrl.filter(
															(a, i) => i !== idx,
														),
													);
												}}
											/>
										</div>
									</>
								))}
						</div>
					</Space>
					{/* ---------------옵션--------------- */}
					<Space>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							옵션 선택
						</span>
						<IcoRequired>
							*<span>파일 선택시 입력창</span>
						</IcoRequired>
						<SpaceOption
							roomNum={roomNum}
							photoUploadEvent3={photoUploadEvent3}
							optionButton={optionButton}
							NameRef={NameRef}
							PriceRef={PriceRef}
							oimageUrl={oimageUrl}
							onload={onload}
							setOnload={setOnload}
						/>
						<div style={{marginTop: '20px', width: '100%'}}>
							<table
								className='table table-bordered'
								style={{
									border: '1px solid black',
									width: '80%',
									marginLeft: '100px',
								}}
							>
								<tbody
									style={{
										width: '80%',
										textAlign: 'center',
									}}
								>
									{roptionList &&
										roptionList.map((rotion, idx) => (
											<tr
												key={idx}
												style={{
													verticalAlign: 'middle',
												}}
											>
												<td style={{width: '5%'}}>
													{idx + 1}
												</td>
												<td style={{width: '20%'}}>
													<img
														style={{
															height: '120px',
															width: '120px',
															maxWidth: '150px',
															maxHeight: '150px',
														}}
														alt=''
														src={
															imageUrl +
															rotion.oimageUrl
														}
													/>
												</td>
												<td style={{width: '20%'}}>
													{rotion.oname}
												</td>
												<td style={{width: '20%'}}>
													{rotion.price}
												</td>
												<td style={{width: '20%'}}>
													<button
														type='button'
														className='btn btn-danger'
														style={{
															cursor: 'pointer',
														}}
														onClick={() => {
															setRoptionList(
																roptionList.filter(
																	(a, i) =>
																		i !==
																		idx,
																),
															);
														}}
													>
														삭제
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</Space>

					{/* ---------------태그--------------- */}
					<Space>
						<div style={{fontSize: '20px', fontWeight: 'bold'}}>
							공간 태그
						</div>
						<SpaceTag
							roomNum={roomNum}
							onchange1={onchange1}
							onchange2={onchange2}
						/>
						<div>
							{tname.map((t, idx2) => (
								<b
									key={idx2}
									style={{
										border: '1px solid pink',
										backgroundColor: '#efefef',
									}}
								>
									<span
										className='close'
										style={{
											cursor: 'pointer',
											width: '30px',
											height: '30px',
											border: '1px solid transparent',
											backgroundColor: 'f6f6f6',
										}}
										onClick={() => {
											setTag(
												tname.filter(
													(a, i) => i !== idx2,
												),
											);
										}}
									>
										#{t}
									</span>
								</b>
							))}
						</div>
					</Space>
					{/* ---------------인포--------------- */}
					<Space className='info'>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							시설 안내
						</span>
						<SpaceInfo
							roomNum={roomNum}
							onchange3={onchange3}
							onchange4={onchange4}
						/>
						<div>
							{icontent.map((info, idx3) => (
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<div>
										<h5 key={idx3}>
											<b
												style={{
													border: '1px solid pink',
													backgroundColor: '#efefef',
												}}
											>
												{info}
											</b>
										</h5>
									</div>
									<div style={{textAlign: 'center'}}>
										<button
											type='button'
											className='btn btn-danger'
											style={{
												cursor: 'pointer',
												height: '30px',
											}}
											onClick={() => {
												setInfo(
													icontent.filter(
														(a, i) => i !== idx3,
													),
												);
											}}
										>
											<span>삭제</span>
										</button>
									</div>
								</div>
							))}
						</div>
					</Space>
					{/* --------------주의사항--------------- */}
					<Space className='warning'>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							주의 사항
						</span>
						<SpaceWarning
							roomNum={roomNum}
							onchange5={onchange5}
							onchange6={onchange6}
						/>
						<div>
							{pcontent.map((pre, idx4) => (
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<div>
										<h5 key={idx4}>
											<b>{pre}</b>
										</h5>
									</div>
									<div>
										<button
											type='button'
											className='btn btn-danger'
											style={{
												cursor: 'pointer',
												height: '30px',
											}}
											onClick={() => {
												setPrecautions(
													pcontent.filter(
														(a, i) => i !== idx4,
													),
												);
											}}
										>
											<span>삭제</span>
										</button>
									</div>
								</div>
							))}
						</div>
					</Space>
				</div>
				{/* --------------다음 버튼 이벤트--------------- */}
				<ButtonEvent>
					<BtnEventWrap>
						<BtnWrap
							typy='button'
							style={{
								cursor: 'pointer',
								backgroundColor: '#4d4d4d',
							}}
							onClick={cancelButton}
						>
							이전
						</BtnWrap>
					</BtnEventWrap>
					<BtnEventWrap>
						<BtnWrap
							type='submit'
							style={{backgroundColor: '#ff3a48'}}
							onClick={nextButton}
						>
							다음
						</BtnWrap>
					</BtnEventWrap>
				</ButtonEvent>
			</form>
		</div>
	);
}

export default SpaceAddForm2;
const ButtonEvent = styled.div`
	margin: 0 auto 100px;
	width: 1380;
`;

const BtnWrap = styled.span`
	display: block;
	width: 100%;
	border-radius: 4px;
	font-size: 20px;
	line-height: 60px;
	color: #fff;
	text-align: center;
`;

const BtnEventWrap = styled.span`
	width: 50%;
	float: left;
	padding-right: 10px;
`;

const IcoRequired = styled.span`
	vertical-align: top;
	color: #ff3a48;
	font-size: 20px;
`;

const Space = styled.div`
	position: relative;
	margin-top: 40px;
`;
