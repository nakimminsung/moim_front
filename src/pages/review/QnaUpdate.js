import {Button} from '@material-ui/core';
import React, {useRef, useState} from 'react';
import {DialogContent, DialogContentText} from '@mui/material';
import {Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from 'axios';
import './Review.css';

function QnaUpdate(props) {
	const {qnaNum, status} = props;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [qnaLength, setQnaLength] = useState('');
	const [qnaTitleLength, setQnaTitleLength] = useState('');
	const contentRef = useRef('');
	const titleRef = useRef('');

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	// Qna내용 수정
	const titleHandler = (e) => {
		e.preventDefault();
		setQnaTitleLength(e.target.value.length);
		setTitle(e.target.value);
	};

	// Qna내용 수정
	const contentHandler = (e) => {
		e.preventDefault();
		setQnaLength(e.target.value.length);
		setContent(e.target.value);
	};

	//삭제
	const deleteQna = () => {
		let deleteUrl = localStorage.url + '/qnaDelete?num=' + qnaNum;
		axios.delete(deleteUrl).then((res) => {
			alert('삭제되었습니다');
			window.location.reload();
		});
	};

	//수정
	const submitHandler = (e) => {
		e.preventDefault();
		// BackEnd로 보낼 url
		let updateUrl = localStorage.url + '/qnaUpdate';
		console.log(updateUrl);
		//formData로 한번에 보내기
		const updateQnaData = new FormData();
		updateQnaData.append('question', content);
		updateQnaData.append('title', title);
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
			alert('수정 완료되었습니다.');

			window.location.reload();
		});

		//성공하고 modal 창 닫기
		setOpen(false);
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
						let selectUrl =
							localStorage.url + '/qnaCotent?num=' + qnaNum;

						axios.get(selectUrl).then((res) => {
							setContent(res.data.question);
							setTitle(res.data.title);
							setQnaLength(res.data.question.length);
							setQnaTitleLength(res.data.title.length);
						});
					} else {
						alert('이미 답변완료되어 수정 및 삭제 불가능합니다');
					}
				}}
			>
				수정/삭제
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
								<span>질문 작성하기</span>
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
										제목
									</b>
									<span style={{float: 'right'}}>
										{qnaTitleLength}/45자
									</span>
								</div>
								<textarea
									maxLength={45}
									placeholder='제목을 입력해주세요'
									style={{
										width: ' 430px',
										height: '50px',
										border: '1px solid lightgray',
									}}
									ref={titleRef}
									value={title}
									onChange={titleHandler}
								/>

								<br />
								<div>
									<b
										style={{
											color: 'black',
											fontSize: '18px',
										}}
									>
										질문
									</b>
									<span style={{float: 'right'}}>
										{qnaLength}/200자
									</span>
								</div>

								<textarea
									maxLength={200}
									placeholder='호스트에게 궁금한 점을 질문해보세요.'
									style={{
										width: ' 430px',
										height: '130px',
										border: '1px solid lightgray',
									}}
									ref={contentRef}
									value={content}
									onChange={contentHandler}
								/>

								<div className='qnaInfo'>
									<ErrorOutlineIcon />
									단, 공간 및 예약에 대한 문의가 아닌 글은
									무통보 삭제될 수 있습니다.
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
								onClick={deleteQna}
							>
								삭제
							</button>
							&nbsp;&nbsp;
							<button
								type='submit'
								className='btn btn-dark'
								style={{width: '50%', height: '40px'}}
								onClick={submitHandler}
							>
								수정
							</button>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default QnaUpdate;
