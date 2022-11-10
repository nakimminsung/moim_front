import {Button, TextField} from '@material-ui/core';
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

			setRoomImage(res.data); // res.data에 배열에 업로드된 사진이름이 배열 형태로 리턴
		});
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
										<tr className='depth_1'>
											<th key={idx}>
												<span>{mc.mcname}</span>
											</th>
											{categorylist &&
												categorylist.map((c, idx) =>
													mc.num ===
													c.mainCategoryNum ? (
														<td key={idx}>
															<span>
																{c.cname}
															</span>
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
								<img
									alt=''
									src={`${imageUrl}${room}`}
									className='roomImge'
									style={{maxWidth: '150px'}}
								/>
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
							id='outlined-number'
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
							id='outlined-number'
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
						<Button variant='contained' color='primary'>
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
							id='outlined-number'
							style={{margin: 8, width: '800px'}}
							placeholder='게스트들이 선호할만한 주요 특징들을 키워드로 입력해주세요'
							required
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
						/>
						<Button variant='contained' color='primary'>
							추가
						</Button>
					</div>
				</div>
				<br />
				<br />
				<div className='warning'>
					<h3>예약시 주의사항</h3>
					<div>
						<TextField
							id='outlined-number'
							style={{margin: 8, width: '800px'}}
							placeholder='게스트들이 예약 시 확인해야 하는 주의사항을 상세하게 입력해주세요'
							required
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
						/>
						<Button variant='contained' color='primary'>
							추가
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SpaceAddForm2;
