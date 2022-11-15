import {Button, Checkbox} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import axios from 'axios';

import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './SpaceAddForm2.css';
import SpaceImages from './SpaceImages';
import SpaceInfo from './SpaceInfo';
import SpaceOption from './SpaceOption';
import SpaceTag from './SpaceTag';
import SpaceWarning from './SpaceWarning';

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
			// console.log(checkedArr, roomNum);
		} else {
		}
	};

	// 태그 담을 배열
	const [tname, setTag] = useState([]);
	console.log(tname);
	//태그 버튼 이벤트
	const onchange1 = () => {
		setTag(tname.concat(document.getElementById('tag').value));
		document.getElementById('tag').value = '';
	};
	//태그 엔터 이벤트
	const onchange2 = (e) => {
		if (e.key === 'Enter') {
			setTag(tname.concat(document.getElementById('tag').value));
			document.getElementById('tag').value = '';
		}
	};

	// 인포 담을 배열
	const [icontent, setInfo] = useState([]);
	console.log(icontent);
	//인포 버튼 이벤트
	const onchange3 = () => {
		setInfo(icontent.concat(document.getElementById('info').value));
		document.getElementById('info').value = '';
	};
	//인포 엔터 이벤트
	const onchange4 = (e) => {
		if (e.key === 'Enter') {
			setInfo(icontent.concat(document.getElementById('info').value));
			document.getElementById('info').value = '';
		}
	};

	// 주의사항 담을 배열
	const [pcontent, setPrecautions] = useState([]);
	console.log(pcontent);
	//주의사항 버튼 이벤트
	const onchange5 = () => {
		setPrecautions(
			pcontent.concat(document.getElementById('precautions').value),
		);
		document.getElementById('precautions').value = '';
	};
	//인포 엔터 이벤트
	const onchange6 = (e) => {
		if (e.key === 'Enter') {
			setPrecautions(
				pcontent.concat(document.getElementById('precautions').value),
			);
			document.getElementById('precautions').value = '';
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

	//옵션 이미지 업로드 이벤트
	const photoUploadEvent3 = (e) => {
		const uploadFile = e.target.files[0];
		let uploadUrl2 = localStorage.url + '/host/optionimage';
		const imageFile = new FormData();
		imageFile.append('uploadFile', uploadFile); //백엔드 컨트롤러에서 MultipartUpload uploadFile 과 일치해야함
		console.log(uploadFile);

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
			{/* ---------------사진--------------- */}
			<div>
				<SpaceImages
					roomNum={roomNum}
					photoUploadEvent2={photoUploadEvent2}
				/>
				<div
					style={{
						border: '1px solid black',
						backgroundColor: '#d3d3d3',
						height: '200px',
					}}
				>
					{rimageUrl &&
						rimageUrl.map((room, idx) => (
							<figure key={idx} style={{float: 'left'}}>
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
												'/host/delphoto?idx=' +
												idx;
											axios.get(delUrl).then((res) => {
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
			</div>
			<br />
			<br />
			{/* ---------------옵션--------------- */}
			<div>
				<SpaceOption
					roomNum={roomNum}
					photoUploadEvent3={photoUploadEvent3}
					optionButton={optionButton}
					NameRef={NameRef}
					PriceRef={PriceRef}
					oimageUrl={oimageUrl}
				/>
				<div>
					{roptionList === 0
						? null
						: roptionList &&
						  roptionList.map((rotion, idx) => (
								<table>
									<tbody>
										<tr key={idx}>
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
											<td>{rotion.oname}</td>
											<td>{rotion.price}</td>
										</tr>
									</tbody>
								</table>
						  ))}
				</div>
			</div>

			<br />
			<br />
			<form onSubmit={nextButton}>
				{/* ---------------유형--------------- */}
				<div>
					<table>
						<tbody>
							{maincategorylist &&
								maincategorylist.map((mc, idx) => (
									<tr>
										<th className='depth_1' key={idx}>
											<span>{mc.mcname}</span>
											<span className='pointer'></span>
										</th>
										{categorylist &&
											categorylist.map((c, idx) =>
												mc.num === c.mainCategoryNum ? (
													<td
														key={idx}
														className='depth_2'
													>
														<label
															style={{
																cursor: 'pointer',
															}}
														>
															<span>
																<Checkbox
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
				<br />
				<br />
				{/* ---------------태그--------------- */}
				<div>
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
								{t}
							</b>
						))}
					</div>
				</div>
				<br />
				<br />
				{/* ---------------인포--------------- */}
				<div className='info'>
					<SpaceInfo
						roomNum={roomNum}
						onchange3={onchange3}
						onchange4={onchange4}
					/>
					<div>
						{icontent.map((info, idx3) => (
							<h5 key={idx3}>
								<b>{info}</b>
							</h5>
						))}
					</div>
				</div>
				<br />
				<br />
				{/* --------------주의사항--------------- */}
				<div className='warning'>
					<SpaceWarning
						roomNum={roomNum}
						onchange5={onchange5}
						onchange6={onchange6}
					/>
					<div>
						{pcontent.map((pre, idx4) => (
							<h5 key={idx4}>
								<b>{pre}</b>
							</h5>
						))}
					</div>
				</div>

				{/* --------------다음 버튼 이벤트--------------- */}
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
