import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import {IconButton, TextField} from '@material-ui/core';
import {PhotoCamera} from '@material-ui/icons';

export default function AlertDialog() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<ModalBtn onClick={handleClickOpen}>기획전 등록하기</ModalBtn>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'기획전 등록'}
				</DialogTitle>
				<DialogContent>
					<ContentWrapper>
						<div>
							<span>타이틀</span>
							<TextField
								id='outlined-basic'
								label='Outlined'
								variant='outlined'
							/>
						</div>
						<div>
							<span>한 줄 설명</span>
							<TextField
								id='outlined-basic'
								label='Outlined'
								variant='outlined'
							/>
						</div>
						<div>
							<span>사진</span>
							<IconButton
								color='primary'
								aria-label='upload picture'
								component='label'
							>
								<input hidden accept='image/*' type='file' />
								<PhotoCamera />
							</IconButton>
						</div>
					</ContentWrapper>
				</DialogContent>
				<DialogActions style={{padding: '0'}}>
					<ButtonWrapper>
						<CancelBtn onClick={handleClose}>취소</CancelBtn>
						<InsertBtn onClick={handleClose} autoFocus>
							등록
						</InsertBtn>
					</ButtonWrapper>
				</DialogActions>
			</Dialog>
		</>
	);
}

const ModalBtn = styled.button`
	background-color: purple;
	border-radius: 10px;
`;
const CancelBtn = styled.button`
	background-color: gray;
`;
const InsertBtn = styled.button`
	background-color: purple;
`;
const ContentWrapper = styled.div`
	> div {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	> div > span {
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
	}
	> div > input {
		width: 70%;
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
