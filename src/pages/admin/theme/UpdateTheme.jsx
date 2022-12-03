import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function UpdateTheme(props) {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState('');
	const [num, setNum] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const selectTheme = () => {
		let url = localStorage.url + '/theme/data?themeNum=' + props.themeNum;
		axios.get(url).then((res) => {
			setTitle(res.data.title);
			setDescription(res.data.description);
			setNum(res.data.num);
		});
	};

	useEffect(() => {
		selectTheme();
	}, []);

	const updateTheme = (e) => {
		let url = localStorage.url + '/theme/update';

		const data = new FormData();
		data.append('num', num);
		data.append('title', title);
		data.append('description', description);
		data.append('file', file);

		axios({
			method: 'patch',
			url: url,
			data: data,
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res) => {
			alert('수정 되었습니다.');
			window.location.reload();
			setTitle('');
			setDescription('');
			setFile([]);
		});
		setOpen(false);
	};

	return (
		<>
			<ModalBtn onClick={handleClickOpen}>기획전 편집</ModalBtn>
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
								value={title}
							/>
						</div>
						<div>
							<span>한 줄 설명</span>
							<TextField
								id='outlined-basic'
								variant='outlined'
								style={{width: '100%'}}
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>
						</div>
						<div>
							<Button variant='contained' component='label'>
								사진 업로드
								<input
									hidden
									accept='image/*'
									multiple
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
						<InsertBtn onClick={updateTheme} autoFocus>
							수정
						</InsertBtn>
					</ButtonWrapper>
				</DialogActions>
			</Dialog>
		</>
	);
}

const ModalBtn = styled.button`
	background-color: gray;
	border-radius: 10px;
	color: white;
`;
const CancelBtn = styled.button`
	background-color: gray;
`;
const InsertBtn = styled.button`
	background-color: purple;
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
	> button {
		width: 50%;
	}
`;
