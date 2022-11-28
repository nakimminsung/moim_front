import React, {useState} from 'react';

//dialogue 관련
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import axios from 'axios';

//modal Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormLabel from '@material-ui/core/FormLabel';

function ReportDetail(props) {
	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);

		//값 비워주기
		setNoticeType('');
		setNoticeTitle('');
		setNoticeContent('');
		setUploadFile([]);

		console.log(uploadFile);
	};

	//modal 내부의 select style 관련
	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));

	const classes = useStyles();

	const [noticeType, setNoticeType] = useState('');
	const [noticeTitle, setNoticeTitle] = useState('');
	const [noticeContent, setNoticeContent] = useState('');
	const [uploadFile, setUploadFile] = useState('');

	//modal 내부의 radio 이벤트
	const [value, setValue] = React.useState('female');
	const handleChange = (event) => {
		setValue(event.target.value);
	};

	//modal 내부의 select 변경 이벤트
	const noticeTypeHandler = (e) => {
		e.preventDefault();
		setNoticeType(e.target.value);
		// console.log('noticeType' + e.target.value);
	};

	const noticeTitleHandler = (e) => {
		e.preventDefault();
		setNoticeTitle(e.target.value);
		// console.log('noticeTitle' + e.target.value);
	};

	const noticeContentHandler = (e) => {
		e.preventDefault();
		setNoticeContent(e.target.value);
		// console.log('noticeContent' + e.target.value);
	};

	const uploadFileHandler = (e) => {
		e.preventDefault();
		setUploadFile(e.target.files[0]);
		// console.log('uploadFile' + e.target.files[0]);
	};

	//modal submit 이벤트
	const submitHandler = (e) => {
		e.preventDefault();

		//값이 비어있는지 체크
		if (noticeType == null || noticeType == '') {
			alert('유형을 선택해주시기 바랍니다');
			return;
		} else if (noticeTitle == null || noticeTitle == '') {
			alert('제목을 입력해주시기 바랍니다');
			return;
		} else if (noticeContent == null || noticeContent == '') {
			alert('내용을 입력해주시기 바랍니다');
			return;
		} else {
			// BackEnd로 보낼 url
			let url = localStorage.url + '/admin/noticeInsert';

			// state에 저장한 값을 가져옵니다.
			// let body = {
			// 	noticeType: noticeType,
			// 	noticeTitle: noticeTitle,
			// 	noticeContent: noticeContent,
			// 	uploadFile: uploadFile,
			// };

			const formData = new FormData();
			formData.append('noticeType', noticeType);
			formData.append('noticeTitle', noticeTitle);
			formData.append('noticeContent', noticeContent);
			formData.append('uploadFile', uploadFile);

			// axios.post(url, body).then((res) => console.log(res));
			//url로 body 데이터를 보낸다

			axios({
				method: 'post',
				url: url, //BackEnd로 보낼 url
				data: formData,
				headers: {'Content-Type': 'multipart/form-data'},
			}).then((res) => {
				console.log('res.data=' + res.data);
				alert('등록이 완료되었습니다.');

				//성공하고 비워주기
				setNoticeType('');
				setNoticeTitle('');
				setNoticeContent('');
				setUploadFile([]);

				//성공하고 화면 리로드
				window.location.reload();
			});

			//성공하고 modal 창 닫기
			setOpen(false);
		}
	};

	return (
		<div>
			<button
				type='button'
				className='btn btn-dark'
				onClick={handleClickOpen}
			>
				상세 보기
			</button>

			{/* Dialogue Modal 화면 : 공지사항 작성 INSERT 폼 */}
			<div>
				<form onSubmit={submitHandler}>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle
							style={{
								backgroundColor: 'gray',
								color: 'white',
								fontWeight: 'bold',
								marginBottom: '10px',
							}}
						>
							신고 상세내용
						</DialogTitle>
						<DialogContent>
							<DialogContentText
								style={{width: '600px', color: 'black'}}
							>
								<b>
									* 담당자는 아래 내용을 확인하신 후{' '}
									<span style={{color: 'red'}}>
										'처리 여부'
									</span>
									를 결정해주시기 바랍니다.
								</b>
							</DialogContentText>
							<br />
							<FormControl
								className={classes.formControl}
								style={{marginLeft: '-0px'}}
							>
								<FormControl component='fieldset'>
									<br />
									<span style={{color: 'gray'}}>
										문의 내용
									</span>
									<RadioGroup
										aria-label='gender'
										name='gender1'
										value={value}
										onChange={handleChange}
									>
										<FormControlLabel
											value='호스트의 예약관리 부주의로 공간 이용 불가능'
											control={<Radio />}
											label='호스트의 예약관리 부주의로 공간 이용 불가능'
										/>
										<FormControlLabel
											value='호스트의 불쾌한 태도 (예: 욕설, 위협, 차별 등)'
											control={<Radio />}
											label='호스트의 불쾌한 태도 (예: 욕설, 위협, 차별 등)'
										/>
										<FormControlLabel
											value='호스트의 외부결제 유도 (예: 송금, 계좌이체, 타 서비스 결제 등)'
											control={<Radio />}
											label='호스트의 외부결제 유도 (예: 송금, 계좌이체, 타 서비스 결제 등)'
										/>
										<FormControlLabel
											value='공간 정보 및 이미지에 문제가 있음 (예: 실제와 다름, 개인정보 유출 등)'
											control={<Radio />}
											label='공간 정보 및 이미지에 문제가 있음 (예: 실제와 다름, 개인정보 유출 등)'
										/>
									</RadioGroup>
								</FormControl>
								<br />
								<span style={{color: 'gray'}}>처리 상태</span>
								<Select
									native
									onChange={noticeTypeHandler}
									value={noticeType}
								>
									<option value={'접수 대기'}>
										접수 대기
									</option>
									<option value={'처리 완료'}>
										처리 완료
									</option>
								</Select>
							</FormControl>

							<TextField
								// autoFocus
								margin='dense'
								id='title'
								label='제목을 입력해주세요'
								type='text'
								fullWidth
								variant='standard'
								onChange={noticeTitleHandler}
								value={noticeTitle}
							/>
							<br />

							<br />
							<input
								type={'file'}
								className='form-control'
								onChange={uploadFileHandler}
							/>
						</DialogContent>
						<DialogActions style={{marginRight: '15px'}}>
							<button
								type='button'
								className='btn btn-outline-secondary'
								onClick={handleClose}
							>
								취소
							</button>
							&nbsp;&nbsp;
							<button
								type='submit'
								className='btn btn-dark'
								onClick={submitHandler}
							>
								저장
							</button>
						</DialogActions>
					</Dialog>
				</form>
			</div>
		</div>
	);
}

export default ReportDetail;
