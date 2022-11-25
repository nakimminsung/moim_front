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

function NoticeInsert(props) {
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
				작성하기
			</button>

			{/* Dialogue Modal 화면 : 공지사항 작성 INSERT 폼 */}
			<div>
				<form onSubmit={submitHandler}>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>공지사항 등록</DialogTitle>
						<DialogContent>
							<DialogContentText style={{width: '600px'}}>
								'유형'을 선택한 후 제목과 내용을 작성해주시기
								바랍니다.
								<br /> 작성이 완료되면 '완료' 버튼을 눌러
								게시글을 등록할 수 있습니다.
							</DialogContentText>

							<FormControl
								className={classes.formControl}
								style={{marginLeft: '-0px'}}
							>
								<InputLabel htmlFor='age-native-simple'>
									유형 선택
								</InputLabel>
								<Select
									native
									onChange={noticeTypeHandler}
									value={noticeType}
								>
									<option aria-label='None' value='' />
									<option value={'이벤트'}>이벤트</option>
									<option value={'공지사항'}>공지사항</option>
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
							<textarea
								className='form-control'
								placeholder='내용을 입력해주시기 바랍니다.'
								style={{height: '300px'}}
								onChange={noticeContentHandler}
								value={noticeContent}
							/>
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

export default NoticeInsert;
