import React, {useEffect, useState} from 'react';

//dialogue 관련
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import axios from 'axios';

function NoticeUpdate(props) {
	//NoticeListAdmin 에서 넘어온 num을 받기위해 변수 선언
	var num = props;

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);

		//modal 오픈할때 공지사항 정보 가져오기
		getNoticeInfo();
	};

	const handleClose = () => {
		setOpen(false);

		//클릭할때마다 DB정보를 가져오므로 값 비워줄필요 없음
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

	const [updateType, setUpdateType] = useState('');
	const [updateTitle, setUpdateTitle] = useState('');
	const [updateContent, setUpdateContent] = useState('');
	const [updateFile, setUpdateFile] = useState('');
	const [oldPhoto, setoldPhoto] = useState('');

	//modal 내부의 select 변경 이벤트
	const noticeTypeHandler = (e) => {
		e.preventDefault();

		setUpdateType(e.target.value);
	};

	//modal 내부의 제목 변경 이벤트
	const noticeTitleHandler = (e) => {
		e.preventDefault();

		setUpdateTitle(e.target.value);
	};

	//modal 내부의 제목 변경 이벤트
	const noticeContentHandler = (e) => {
		e.preventDefault();

		setUpdateContent(e.target.value);
	};

	//modal 내부의 파일 변경 이벤트
	const uploadFileHandler = (e) => {
		e.preventDefault();

		setUpdateFile(e.target.files[0]);
	};

	//modal submit 이벤트
	const submitHandler = (e) => {
		e.preventDefault();

		//값이 비어있는지 체크
		if (updateType == null || updateType == '') {
			alert('유형을 선택해주시기 바랍니다');
			return;
		} else if (updateTitle == null || updateTitle == '') {
			alert('제목을 입력해주시기 바랍니다');
			return;
		} else if (updateContent == null || updateContent == '') {
			alert('내용을 입력해주시기 바랍니다');
			return;
		} else {
			// BackEnd로 보낼 url
			// let url = localStorage.url + '/admin/noticeInsert?num=' + num;
			let url = localStorage.url + '/admin/updateNotice';

			//formData로 한번에 보내기
			const updateData = new FormData();
			updateData.append('updateType', updateType);
			updateData.append('updateTitle', updateTitle);
			updateData.append('updateContent', updateContent);
			updateData.append('updateFile', updateFile);
			updateData.append('num', props.num);
			updateData.append('oldPhoto', oldPhoto);

			//url로 body 데이터를 보낸다
			axios({
				method: 'post',
				url: url, //BackEnd로 보낼 url
				data: updateData,
				headers: {'Content-Type': 'multipart/form-data'},
			}).then((res) => {
				console.log('res.data=' + res.data);
				alert('수정 완료되었습니다.');

				//성공하고 비워주기
				setUpdateType('');
				setUpdateTitle('');
				setUpdateContent('');
				setUpdateFile([]);
				setoldPhoto('');

				//성공하고 화면 리로드
				window.location.reload();
			});

			//성공하고 modal 창 닫기
			setOpen(false);
		}
	};

	// num값에 해당하는 notice 정보 가져오기
	const getNoticeInfo = () => {
		let url = localStorage.url + '/admin/getNoticeInfo?num=' + props.num;
		console.log(url);

		axios.get(url).then((res) => {
			console.log(res.data);

			//가져온 데이터를 변수에 담기
			setUpdateType(res.data.type);
			setUpdateTitle(res.data.title);
			setUpdateContent(res.data.content);
			setoldPhoto(res.data.imageUrl);
		});
	};

	return (
		<div>
			<button
				type='button'
				className='btn btn-secondary'
				onClick={handleClickOpen}
			>
				수정
			</button>

			{/* Dialogue Modal 화면 : 공지사항 수정 update 폼 */}
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
							공지사항 수정
						</DialogTitle>
						<DialogContent>
							<DialogContentText style={{width: '600px'}}>
								'유형'을 선택한 후 제목과 내용을 수정해주시기
								바랍니다.
								<br /> 작성이 완료되면 '완료' 버튼을 눌러
								게시글을 수정할 수 있습니다.
							</DialogContentText>

							<FormControl
								className={classes.formControl}
								style={{marginLeft: '-0px'}}
							>
								{/* <InputLabel htmlFor='age-native-simple'>
									유형 선택
								</InputLabel> */}

								<Select
									native
									onChange={noticeTypeHandler}
									//value={noticeType}
									value={updateType}
								>
									<option value={'이벤트'}>이벤트</option>
									<option value={'공지사항'}>공지사항</option>
								</Select>
							</FormControl>

							<TextField
								margin='dense'
								id='title'
								// label='제목을 입력해주세요'
								type='text'
								fullWidth
								variant='standard'
								onChange={noticeTitleHandler}
								value={updateTitle}
							/>
							<br />
							<br />
							<textarea
								className='form-control'
								placeholder='내용을 입력해주시기 바랍니다.'
								style={{height: '300px'}}
								onChange={noticeContentHandler}
								value={updateContent}
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

export default NoticeUpdate;
