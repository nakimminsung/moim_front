import {Button, TextField} from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';

function SpaceOption(props) {
	const {
		roomNum,
		photoUploadEvent3,
		optionButton,
		NameRef,
		PriceRef,
		oimageUrl,
	} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';

	// // 옵션 담을 배열
	// const [roptionList, setRoptionList] = useState([{}]);
	// // 옵션 네임
	// const NameRef = React.useRef('');
	// // 옵션 가격
	// const PriceRef = React.useRef('');
	// // 옵션 이미지
	// const [oimageUrl, setOimageUrl] = useState('');

	// //옵션 이미지 업로드 이벤트
	// const photoUploadEvent3 = (e) => {
	// 	const uploadFile = e.target.files[0];
	// 	let uploadUrl2 = localStorage.url + '/host/optionimage';
	// 	const imageFile = new FormData();
	// 	imageFile.append('uploadFile', uploadFile); //백엔드 컨트롤러에서 MultipartUpload uploadFile 과 일치해야함
	// 	console.log(uploadFile);

	// 	axios({
	// 		method: 'post',
	// 		url: uploadUrl2,
	// 		data: imageFile,
	// 		headers: {'Content-Type': 'multipart/form-data'},
	// 	}).then((res) => {
	// 		//파라미터를 res가 받고(response 를 뜻함) String으로 보냈음(Public String)

	// 		//스프링에서 map이 아닌 String으로 업로드한 파일명을 리턴했으므로 res가 곧 파일명임
	// 		setOimageUrl(res.data);
	// 	});
	// };

	// const optionButton = (e) => {
	// 	e.preventDefault();
	// 	let optioninsertUrl = localStorage.url + '/host/optioninsert';
	// 	let oname = NameRef.current.value;
	// 	let price = PriceRef.current.value;
	// 	console.log(oname);
	// 	console.log(price);

	// 	axios
	// 		.post(optioninsertUrl, {
	// 			roomNum,
	// 			oname,
	// 			price,
	// 		})
	// 		.then((res) => {
	// 			setRoptionList(
	// 				roptionList.concat({
	// 					oname,
	// 					price,
	// 					oimageUrl,
	// 				}),
	// 			);
	// 		});
	// 	NameRef.current.value = '';
	// 	PriceRef.current.value = '';
	// 	setOimageUrl('');
	// };
	return (
		<div>
			<h3>옵션 선택</h3>
			<div>
				<div>
					<input
						type='file'
						id='roption1'
						style={{visibility: 'hidden'}}
						onChange={photoUploadEvent3}
					/>
					<span
						onClick={() => {
							document.getElementById('roption1').click();
						}}
					>
						<b style={{cursor: 'pointer'}}>옵션 사진 추가</b>
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
				</div>
			</div>
		</div>
	);
}

export default SpaceOption;
