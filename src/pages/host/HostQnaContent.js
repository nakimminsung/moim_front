import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {DialogContent, DialogContentText} from '@mui/material';
import {Dialog, DialogActions, DialogTitle} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from 'axios';
import './HostRQ.css';

function HostQnaContent(props) {
	const {qnaNum, status} = props;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [writeday, setWriteday] = useState('');
	const [answer, setAnswer] = useState('');
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
						setWriteday(res.data.writeday);
						setAnswer(res.data.answer);
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

					<DialogContent style={{paddingTop: '8px'}}>
						<div>
							<h5>
								<b>{title}</b>
							</h5>
						</div>

						<div style={{marginTop: '20px'}}>
							<h6>
								<b>Q. 질문내용</b>
							</h6>
						</div>
						<DialogContentText>
							<pre className='qnaContent1'>
								{content}
								<div className='qnaWriteday'>{writeday}</div>
							</pre>
						</DialogContentText>
						{status == '답변완료' ? (
							<div>
								<div>
									<h6>
										<b>A. 호스트 답변</b>
									</h6>
								</div>
								<DialogContentText>
									<pre className='qnaContent1'>
										{answer}
										<div className='qnaWriteday'>
											{answerday}
										</div>
									</pre>
								</DialogContentText>
							</div>
						) : (
							''
						)}
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default HostQnaContent;
