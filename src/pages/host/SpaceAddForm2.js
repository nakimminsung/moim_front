import {Button, Checkbox, TextField} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import axios from 'axios';

import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './SpaceAddForm2.css';

function SpaceAddForm2(props) {
	const {num} = useParams();
	const navi = useNavigate();

	//룸 넘버
	const roomNum = num;
	// 카테고리 배열
	const [categorylist, setCategoryList] = useState([]);
	// 메인카테고리 배열
	const [maincategorylist, setMainCategoryList] = useState([]);
	// 방 이미지 담을 배열
	const [rimageUrl, setRoomImage] = useState([]);

	// 옵션 담을 배열
	// const roptionList = [{}];
	const [roptionList, setRoptionList] = useState([{}]);
	// 옵션 네임
	const NameRef = React.useRef('');
	// 옵션 가격
	const PriceRef = React.useRef('');
	// 옵션 이미지
	const [oimageUrl, setOimageUrl] = useState('');

	//옵션 이미지 업로드 이벤트
	const photoUploadEvent3 = (e) => {
		const uploadFile = e.target.files[0];
		let uploadUrl2 = localStorage.url + '/host/optionimage';
		const imageFile = new FormData();
		imageFile.append('uploadFile', uploadFile); //백엔드 컨트롤러에서 MultipartUpload uploadFile 과 일치해야함
		// console.log(uploadFile);

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

	//옵션 버튼 추가 버튼 이벤트
	const optionButton = () => {
		let optionName = NameRef.current.value;
		let optionPrice = PriceRef.current.value;

		console.log(optionName);
		console.log(optionPrice);
		console.log(oimageUrl);

		setRoptionList(
			roptionList.concat({
				optionName,
				optionPrice,
				oimageUrl,
			}),
		);

		console.log(roptionList);

		NameRef.current.value = '';
		PriceRef.current.value = '';
		setOimageUrl('');
	};

	// useEffect(() => {
	// 	// setRoptionList(roptionList.concat(optionName, optionPrice));
	// }, []);

	// 태그 담을 배열
	const [tname, setTag] = useState([]);
	// 인포 담을 배열
	const [icontent, setInfo] = useState([]);
	// 주의사항 담을 배열
	const [pcontent, setPrecautions] = useState([]);
	// 카테고리 체크박스 (체크된 카테고리의 번호를 담을 배열)
	const [checkedArr, setCheckedArr] = useState([]);

	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';

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

	//태그 이벤트
	const onchange = () => {
		setTag(tname.concat(document.getElementById('tag').value));
		document.getElementById('tag').value = '';
	};

	//인포 이벤트
	const onchange2 = () => {
		setInfo(icontent.concat(document.getElementById('info').value));
		document.getElementById('info').value = '';
	};

	//주의사항 이벤트
	const onchange3 = () => {
		setPrecautions(
			pcontent.concat(document.getElementById('precautions').value),
		);
		document.getElementById('precautions').value = '';
	};

	//카테고리 체크박스 이벤트
	const handleSingleCheck = (checked, num) => {
		if (checked) {
			// 단일 선택 시 체크된 아이템을 배열에 추가
			setCheckedArr((prev) => [...prev, num]);
			console.log(checkedArr);
		} else if (!checked) {
			// 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
			setCheckedArr(checkedArr.filter((el) => el !== num));
			console.log(checkedArr);
		} else {
		}
	};

	//취소 버튼 클릭 이벤트
	const cancelButton = () => {
		const cancelUrl = localStorage.url + '/host/cancel?num=' + num;
		axios.delete(cancelUrl).then((res) => {
			navi('/host/addform');
		});
	};

	//다음 버튼 클릭 이벤트
	const nextButton = (e) => {
		e.preventDefault();

		let insertUrl = localStorage.url + '/host/insert2';
		axios
			.post(insertUrl, {
				roomNum,
				tname,
				icontent,
				pcontent,
				checkedArr,
				oname: 'optionName',
				oimgeUrl: 'optionPrice',
				oimageUrl,
			})
			.then((res) => {
				navi(`/host/addform3/${res.roomNum}`);
			});
	};

	return (
		<div>
			<form onSubmit={nextButton}>
				<div>
					<h3>공간유형</h3>
					<div className='row'>
						<table className='check_list space'>
							<tbody>
								{maincategorylist &&
									maincategorylist.map((mc, idx) => (
										<tr>
											<th
												className='depth_1'
												key={idx}
												// style={{
												// 	height: '48px',
												// 	verticalAlign: 'top',
												// }}
											>
												<span
												// style={{
												// 	width: '130px',
												// 	padding: '4px 24px',
												// 	lineHeight: '1.3',
												// 	display: 'block',
												// 	borderRadius: '14px',
												// 	backgroundColor:
												// 		'#e2e2e2',
												// 	textAlign: 'center',
												// }}
												>
													{mc.mcname}
												</span>
												<span
													className='pointer'
													style={
														{
															// position: 'absolute',
															// marginTop: '-20.5px',
															// width: '0',
															// height: '0',
															// borderLeft:
															// 	' 10px solid #e2e2e2',
															// borderTop:
															// 	'5px solid transparent',
															// borderBottom:
															// 	'5px solid transparent',
															// marginLeft: '128.5px',
														}
													}
												></span>
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
																style={{
																	cursor: 'pointer',
																}}
															>
																<span
																// style={{
																// 	padding:
																// 		'0 16px 16px 0',
																// 	fontSize:
																// 		'18px',
																// }}
																>
																	<Checkbox
																		// style={{
																		// 	display:
																		// 		'none',
																		// }}
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
																	{c.cname}
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
				</div>
				<br />
				<br />
				<div className='previewimg'>
					<div className='input-group'>
						<h3>방에 대한 사진을 등록해주세요</h3>
						<div>
							<input
								type='file'
								id='filephoto2'
								multiple
								style={{visibility: 'hidden'}}
								onChange={photoUploadEvent2}
								required
							/>
							<span
								onClick={() => {
									document
										.getElementById('filephoto2')
										.click();
								}}
							>
								<b style={{cursor: 'pointer'}}>사진 추가</b>
							</span>
						</div>
					</div>
					<br />
					<div
						style={{
							border: '1px solid black',
							backgroundColor: '#d3d3d3',
							height: '200px',
						}}
					>
						{rimageUrl &&
							rimageUrl.map((room, idx) => (
								<figure style={{float: 'left'}}>
									<img
										alt=''
										src={`${imageUrl}${room}`}
										className='roomImge'
										style={{maxWidth: '100px'}}
									/>
									<figcaption>
										<CloseOutlined
											style={{cursor: 'pointer'}}
											onClick={() => {
												const delUrl =
													localStorage.url +
													'/host/delphoto?idx' +
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
									</figcaption>
								</figure>
							))}
					</div>
					<div>
						{rimageUrl == 0 ? null : (
							<Button variant='contained' color='primary'>
								저장
							</Button>
						)}
					</div>
				</div>
				<br />
				<br />
				<div className='tag'>
					<h3>옵션 선택</h3>
					<div>
						<div>
							<input
								type='file'
								id='roption1'
								style={{visibility: 'hidden'}}
								onChange={photoUploadEvent3}
								required
							/>
							<span
								onClick={() => {
									document.getElementById('roption1').click();
								}}
							>
								<b style={{cursor: 'pointer'}}>
									옵션 사진 추가
								</b>
							</span>
						</div>
						<div className='previewimg'>
							<img
								alt=''
								src={imageUrl + oimageUrl}
								style={{maxWidth: '300px'}}
							/>
						</div>
						<div>
							{/* <input type={'text'} ref={NameRef}></input> */}
							<TextField
								id='roption2'
								style={{margin: 8, width: '400px'}}
								placeholder='옵션을 입력해주세요'
								InputLabelProps={{
									shrink: true,
								}}
								variant='outlined'
								size='small'
								inputRef={NameRef}
							/>

							<TextField
								id='roption3'
								type='number'
								style={{margin: 8, width: '400px'}}
								placeholder='가격을 입력해주세요'
								InputLabelProps={{
									shrink: true,
								}}
								variant='outlined'
								size='small'
								inputRef={PriceRef}
							/>
							<Button
								variant='contained'
								color='primary'
								onClick={optionButton}
							>
								추가
							</Button>
							<div>
								{roptionList == 0
									? null
									: roptionList &&
									  roptionList.map((rotion, idx) => (
											<table>
												<tbody>
													<tr>
														<td>
															<img
																style={{
																	width: '150px',
																}}
																alt=''
																src={
																	imageUrl +
																	rotion.oimageUrl
																}
															/>
														</td>
														<td>
															{rotion.optionName}
														</td>
														<td>
															{rotion.optionPrice}
														</td>
													</tr>
												</tbody>
											</table>
											//  <img alt='' src={rotion.oimageUrl},
											// <h3 key={idx}>
											// 	{rotion.optionName}
											// 	{rotion.optionPrice}
											// 	{rotion.oimageUrl}
											// </h3>
											// <img alt='' src={rotion.oimageUrl}/>
									  ))}
							</div>
						</div>
					</div>
				</div>
				<br />
				<br />
				<div className='tag'>
					<h3>공간 태그</h3>
					<div>
						<TextField
							id='tag'
							style={{margin: 8, width: '800px'}}
							placeholder='게스트들이 선호할만한 주요 특징들을 키워드로 입력해주세요'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									setTag(tname.concat(e.target.value));
									e.target.value = '';
								}
							}}
						/>
						<Button
							variant='contained'
							color='primary'
							onClick={onchange}
						>
							추가
						</Button>
						<div>
							{tname.map((t, i) => (
								<b
									key={i}
									style={{
										border: '1px solid pink',
										backgroundColor: '#efefef',
									}}
								>
									{t}
								</b>
							))}
						</div>
					</div>
				</div>
				<br />
				<br />
				<div className='info'>
					<h3>시설안내</h3>
					<div>
						<TextField
							id='info'
							style={{margin: 8, width: '800px'}}
							placeholder='게스트들이 선호할만한 주요 특징들을 키워드로 입력해주세요'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									setInfo(icontent.concat(e.target.value));
									e.target.value = '';
								}
							}}
						/>
						<Button
							variant='contained'
							color='primary'
							onClick={onchange2}
						>
							추가
						</Button>
						<div>
							{icontent.map((info, i) => (
								<h5>
									<b>{info}</b>
								</h5>
							))}
						</div>
					</div>
				</div>
				<br />
				<br />
				<div className='warning'>
					<h3>예약시 주의사항</h3>
					<div>
						<TextField
							id='precautions'
							style={{margin: 8, width: '800px'}}
							placeholder='게스트들이 예약 시 확인해야 하는 주의사항을 상세하게 입력해주세요'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									setPrecautions(
										pcontent.concat(e.target.value),
									);
									e.target.value = '';
								}
							}}
						/>
						<Button
							variant='contained'
							color='primary'
							onClick={onchange3}
						>
							추가
						</Button>
						<div>
							{pcontent.map((pre, i) => (
								<h5>
									<b>{pre}</b>
								</h5>
							))}
						</div>
					</div>
				</div>
				<div>
					<div className='buttonEvent'>
						<Button
							variant='contained'
							color='primary'
							type='submit'
						>
							다음
						</Button>
						<Button
							variant='contained'
							color='secondary'
							type='button'
							onClick={cancelButton}
						>
							이전
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SpaceAddForm2;
