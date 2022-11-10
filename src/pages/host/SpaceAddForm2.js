import {Button, Checkbox, Input, TextField} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import {borderBottom, height, style} from '@mui/system';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './SpaceAddForm2.css';

function SpaceAddForm2(props) {
	const {num} = useParams();
	console.log(num);

	const [categorylist, setCategoryList] = useState([]);
	const [maincategorylist, setMainCategoryList] = useState([]);
	const [roomImage, setRoomImage] = useState([]);

	const [roomnNum, setRoomNum] = useState(num);

	const [tag, setTag] = useState([]);
	const [info, setInfo] = useState([]);
	const [precautions, setPrecautions] = useState([]);

	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';

	const clist = () => {
		let clistUrl = localStorage.url + '/host/categoryList';
		axios.get(clistUrl).then((res) => {
			setCategoryList(res.data);
		});
	};
	useEffect(() => {
		clist();
	}, []);

	const mclist = () => {
		let mclistUrl = localStorage.url + '/host/maincategoryList';
		axios.get(mclistUrl).then((res) => {
			setMainCategoryList(res.data);
		});
	};
	useEffect(() => {
		mclist();
	}, []);

	//파일 업로드 이벤트
	const photoUploadEvent2 = (e) => {
		let uploadUrl = localStorage.url + '/host/photolistupload';
		console.log(e.target.files.length + '개');
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
			console.log(res.data.length + '개 들어옴');
			setRoomImage(roomImage.concat(res.data)); // res.data에 배열에 업로드된 사진이름이 배열 형태로 리턴
			// setRoomArray(roomArray.concat(res.data));
		});
	};

	const onchange = () => {
		setTag(tag.concat(document.getElementById('tag').value));
		document.getElementById('tag').value = '';
	};

	const onchange2 = () => {
		setInfo(info.concat(document.getElementById('info').value));
		document.getElementById('info').value = '';
	};

	const onchange3 = () => {
		setPrecautions(
			precautions.concat(document.getElementById('precautions').value),
		);
		document.getElementById('precautions').value = '';
	};

	return (
		<div>
			<form>
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
												style={{
													height: '48px',
													verticalAlign: 'top',
												}}
											>
												<span
													style={{
														width: '130px',
														padding: '4px 24px',
														lineHeight: '1.3',
														display: 'block',
														borderRadius: '14px',
														backgroundColor:
															'#e2e2e2',
														textAlign: 'center',
													}}
												>
													{mc.mcname}
												</span>
												<span
													className='pointer'
													style={{
														position: 'absolute',
														marginTop: '-20.5px',
														width: '0',
														height: '0',
														borderLeft:
															' 10px solid #e2e2e2',
														borderTop:
															'5px solid transparent',
														borderBottom:
															'5px solid transparent',
														marginLeft: '128.5px',
													}}
												></span>
											</th>
											{categorylist &&
												categorylist.map((c, idx) =>
													mc.num ===
													c.mainCategoryNum ? (
														<td key={idx}>
															<label
																style={{
																	cursor: 'pointer',
																}}
															>
																<span
																	style={{
																		padding:
																			'0 16px 16px 0',
																		fontSize:
																			'18px',
																	}}
																>
																	<Checkbox
																		inputProps={{
																			'aria-label':
																				'uncontrolled-checkbox',
																		}}
																		name='space'
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
								document.getElementById('filephoto2').click();
							}}
						>
							<b style={{cursor: 'pointer'}}>사진 추가</b>
						</span>
					</div>
					<br />
					<div
						style={{
							border: '1px solid black',
							backgroundColor: '#d3d3d3',
							height: '200px',
						}}
					>
						{roomImage &&
							roomImage.map((room, idx) => (
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
													roomImage.filter(
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
						{roomImage == 0 ? null : (
							<Button variant='contained' color='primary'>
								저장
							</Button>
						)}
					</div>
				</div>
				<br />
				<br />
				<div className='headcount'>
					<h3>인원수</h3>
					<div>
						<TextField
							id='headcount'
							type='number'
							style={{margin: 8, width: '250px'}}
							placeholder='최대 인원수를 선택해주세요'
							required
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
						/>
						<b>명</b>
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
							required
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									setTag(tag.concat(e.target.value));
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
							{tag.map((t, i) => (
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
							required
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									setInfo(info.concat(e.target.value));
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
							{info.map((info, i) => (
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
							required
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							onKeyUp={(e) => {
								if (e.key === 'Enter') {
									setPrecautions(
										precautions.concat(e.target.value),
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
							{precautions.map((pre, i) => (
								<h5>
									<b>{pre}</b>
								</h5>
							))}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SpaceAddForm2;
