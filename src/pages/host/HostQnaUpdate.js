import {Button} from '@material-ui/core';
import React, {useRef, useState} from 'react';
import {DialogContent, DialogContentText} from '@mui/material';
import {Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from 'axios';
import './HostRQ.css';

function HostQnaUpdate(props) {
	const {qnaNum, status} = props;
	const [qnaAnswer, setQnaAnswer] = useState('');
	const [qnaLength, setQnaLength] = useState(0);
	const contentRef = useRef('');

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
		setQnaLength(0);
	};

	// Qna내용 수정
	const contentHandler = (e) => {
		e.preventDefault();
		setQnaLength(e.target.value.length);
		setQnaAnswer(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// BackEnd로 보낼 url
		let updateUrl = localStorage.url + '/hostQnaAnswer';
		console.log(updateUrl);
		//formData로 한번에 보내기
		const updateQnaData = new FormData();
		updateQnaData.append('answer', qnaAnswer);
		updateQnaData.append('num', qnaNum);

		for (let key of updateQnaData.keys()) {
			console.log(key, ':', updateQnaData.get(key));
		}

		//url로 body 데이터를 보낸다
		axios({
			method: 'post',
			url: updateUrl, //BackEnd로 보낼 url
			data: updateQnaData,
		}).then((res) => {
			alert('답변 완료되었습니다.');
			window.location.reload();
			//성공하고 modal 창 닫기
			setOpen(false);
		});
	};
	return (
		<div style={{width: '47%'}}>
			<Button
				variant='contained'
				style={{
					background: '#704de4',
					color: 'white',
					width: '100%',
					height: '40px',
				}}
				onClick={() => {
					if (status == '답변대기중') {
						setOpen(true);
					} else {
						alert('이미 답변완료되어 수정 및 삭제 불가능합니다');
					}
				}}
			>
				답변하기
			</Button>

			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle
						id='alert-dialog-title'
						style={{backgroundColor: '#704de4', color: 'white'}}
					>
						{
							<div>
								<span>답변 작성하기</span>
								<span onClick={handleClose}>
									<CloseIcon
										style={{
											float: 'right',
											cursor: 'pointer',
										}}
									/>
								</span>
							</div>
						}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							<div style={{marginTop: '25px', width: '430px'}}>
								<div>
									<b
										style={{
											color: 'black',
											fontSize: '18px',
										}}
									>
										답변
									</b>
									<span style={{float: 'right'}}>
										{qnaLength}/200자
									</span>
								</div>

								<textarea
									maxLength={200}
									placeholder='고객들의 궁금한 점을 해결해주세요'
									style={{
										width: ' 430px',
										height: '130px',
										border: '1px solid lightgray',
									}}
									ref={contentRef}
									onChange={contentHandler}
								/>

								<div className='qnaInfo'>
									<ErrorOutlineIcon />
									단, 고객들에게 문의 답변이 아닌 비방글등은
									신고 받을 수 있습니다.
								</div>
							</div>
						</DialogContentText>
						<DialogActions
							style={{
								marginTop: '20px',
								width: '100%',
								textAlign: 'center',
							}}
						>
							<button
								type='button'
								className='btn btn-secondary'
								style={{width: '50%', height: '40px'}}
								onClick={handleClose}
							>
								취소
							</button>
							&nbsp;&nbsp;
							<button
								type='submit'
								className='btn btn-dark'
								style={{width: '50%', height: '40px'}}
								onClick={submitHandler}
							>
								답변하기
							</button>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default HostQnaUpdate;
