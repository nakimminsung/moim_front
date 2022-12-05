import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';

export default function AddTheme(props) {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const insertTheme = (e) => {
		let url = localStorage.url + '/theme/insert';
		const data = new FormData();
		data.append('title', title);
		data.append('description', description);
		data.append('file', file);

		title === '' || description === '' || file.length === 0
			? alert('데이터 모두 입력해주세요')
			: axios({
					method: 'post',
					url: url,
					data: data,
					headers: {'Content-Type': 'multipart/form-data'},
			  }).then((res) => {
					alert('등록이 완료되었습니다.');
					props.selectThemeList();
					setTitle('');
					setDescription('');
					setFile([]);
					setOpen(false);
			  });
	};

	return (
		<>
			<Button
				variant='contained'
				style={{backgroundColor: '#704de4'}}
				onClick={handleClickOpen}
			>
				기획전 등록하기
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'기획전 등록'}
				</DialogTitle>
				<DialogContent style={{padding: '10px', width: '500px'}}>
					<ContentWrapper>
						<div>
							<span>타이틀</span>
							<TextField
								id='outlined-basic'
								variant='outlined'
								style={{width: '100%'}}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div>
							<span>한 줄 설명</span>
							<TextField
								id='outlined-basic'
								variant='outlined'
								style={{width: '100%'}}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div>
							<Button
								variant='outlined'
								component='label'
								color='inherit'
							>
								사진 업로드
								<input
									hidden
									accept='image/*'
									type='file'
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</Button>
						</div>
					</ContentWrapper>
				</DialogContent>
				<DialogActions style={{padding: '0'}}>
					<ButtonWrapper>
						<CancelBtn onClick={handleClose}>취소</CancelBtn>
						<InsertBtn onClick={insertTheme} autoFocus>
							등록
						</InsertBtn>
					</ButtonWrapper>
				</DialogActions>
			</Dialog>
		</>
	);
}

const CancelBtn = styled.div`
	background-color: #b0b0b0;
`;
const InsertBtn = styled.div`
	background-color: #704de4;
`;
const ContentWrapper = styled.div`
	margin-top: 10px;
	> div {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}
	> div > span {
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		margin-right: 10px;
		font-size: 15px;
	}
	> div > input {
		width: 70%;
	}
	> div > label {
		width: 100%;
	}
`;
const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	> div {
		width: 50%;
		color: white;
		text-align: center;
		height: 50px;
		line-height: 50px;
		cursor: pointer;
	}
`;
