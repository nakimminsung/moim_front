import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {DialogContent, DialogContentText} from '@mui/material';
import {Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from 'axios';
import './Review.css';

import ReportInsert from '../roomsdetail/ReportInsert';

function QnaContent(props) {
	const {qnaNum, status, roomNum} = props;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [answer, setAnswer] = useState('');
	const [writeday, setWriteday] = useState('');
	const [answerday, setAnswerday] = useState('');

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div style={{width: status == '답변완료' ? '93%' : '47%'}}>
			<Button
				variant='contained'
				style={{
					background: 'black',
					opacity: '0.7',
					color: 'white',
					height: '40px',
					width: '100%',
				}}
				onClick={() => {
					setOpen(true);
					let selectUrl =
						localStorage.url + '/qnaCotent?num=' + qnaNum;

					axios.get(selectUrl).then((res) => {
						setContent(res.data.question);
						setTitle(res.data.title);
						setAnswer(res.data.answer);
						setWriteday(res.data.writeday);
						setAnswerday(res.data.answerday);
					});
				}}
			>
				내용보기
			</Button>

			<div>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle
						style={{
							backgroundColor: '#704de4',
							color: 'white',
							textAlign: 'center',
						}}
					>
						내용보기
						<span onClick={handleClose}>
							<CloseIcon
								style={{
									float: 'right',
									cursor: 'pointer',
									marginTop: '5px',
								}}
							/>
						</span>
					</DialogTitle>

					<DialogContent style={{paddingTop: '12px'}}>
						<div>
							<h5>
								<b>문의제목 : {title}</b>
							</h5>
						</div>
						<div style={{marginTop: '30px'}}>
							<h5>
								<b>Q. 질문내용</b>
							</h5>
						</div>
						<DialogContentText>
							<pre className='qnaContent1'>
								{content}
								<div
									className='qnaWriteday'
									style={{
										bottom:
											status == '답변완료'
												? '245px'
												: '220px',
									}}
								>
									{writeday}
								</div>
							</pre>
						</DialogContentText>
						<br />
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<h5>
								<b>A. 답변</b>
							</h5>
							{/* jhwon 신고하기 기능 추가 */}
							<ReportInsert roomNum={roomNum} />

							{/* const {roomNum, userNum} = props; 필요 */}
						</div>

						<DialogContentText>
							{answer == null ? (
								<pre
									className='qnaContent1'
									style={{
										lineHeight: '100px',
										textAlign: 'center',
									}}
								>
									호스트의 답변이 아직 없습니다
								</pre>
							) : (
								<div>
									<pre className='qnaContent1'>
										{answer}
										<div className='qnaAnswerday'>
											{answerday}
										</div>
									</pre>
									<div className='qnaHostInfo'>
										<ErrorOutlineIcon />
										문의에 대한 답변이 아닌 비방글 등은 신고
										할 수 있습니다.
									</div>
								</div>
							)}
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default QnaContent;
