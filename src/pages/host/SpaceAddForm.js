import {TextField} from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import DaumPostcode from 'react-daum-postcode';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button';
// import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

//다이얼로그에 필요한 코드들
const BootstrapDialog = styled(Dialog)(({theme}) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

function BootstrapDialogTitle(props) {
	const {children, onClose, ...other} = props;

	return (
		<DialogTitle sx={{m: 0, p: 2}} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[600],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

function SpaceAddForm(props) {
	//주소 검색
	const [openPostcode, setOpenPostcode] = useState(false);
	const [address, setAddress] = useState('');
	const [address2, setAddress2] = useState('');
	const [open, setOpen] = React.useState(false);

	const [name, setName] = useState();
	const [oneIntroduction, setOneIntroduction] = useState();
	const [fullIntroduction, setFullIntroduction] = useState();

	const [num, setNum] = useState();

	const navi = useNavigate();

	const handle = {
		// 버튼 클릭 이벤트
		clickButton: () => {
			setOpen(true);
			setOpenPostcode((current) => !current);
		},

		// 주소 선택 이벤트
		selectAddress: (data) => {
			console.dir(data);
			console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
			setAddress(
				`${data.address} ${data.buildingName} (${data.zonecode})`,
			);

			setOpenPostcode(false);
			setOpen(false);
		},
	};

	const handleClose = () => {
		setOpen(false);
		setOpenPostcode(false);
	};

	localStorage.url = 'http://localhost:9000';
	let uploadUrl = localStorage.url + '/host/photoupload';
	let imageUrl = localStorage.url + '/image/';

	//파일 미리보기
	const [thumbnailImage, setThumbnailImage] = useState('');

	//파일첨부 이벤트
	const photoUploadEvent = (e) => {
		const uploadFile = e.target.files[0];
		const imageFile = new FormData();
		imageFile.append('uploadFile', uploadFile); //백엔드 컨트롤러에서 MultipartUpload uploadFile 과 일치해야함

		axios({
			method: 'post',
			url: uploadUrl,
			data: imageFile,
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res) => {
			//파라미터를 res가 받고(response 를 뜻함) String으로 보냈음(Public String)

			//스프링에서 map이 아닌 String으로 업로드한 파일명을 리턴했으므로 res가 곧 파일명임
			setThumbnailImage(res.data);
		});
	};

	// 다음 페이지로 이동
	const onSubmitEvent = (e) => {
		console.log(oneIntroduction);
		e.preventDefault();

		let insertUrl = localStorage.url + '/host/insert';
		axios
			.post(insertUrl, {
				name,
				address,
				address2,
				oneIntroduction,
				fullIntroduction,
			})
			.then((res) => {
				setNum(res.data);
				navi(`/host/addform2/${res.data}`);
			});
	};

	return (
		<div>
			<form onSubmit={onSubmitEvent}>
				<div className='input-group'>
					<h3>공간 정보를 입력해주세요.</h3>
					<b>* 필수 입력</b>
				</div>
				<div className='roomName'>
					<h3>공간명</h3>
					<TextField
						id='outlined-full-width'
						style={{margin: 8}}
						placeholder='공간명 입력'
						fullWidth
						required
						margin='normal'
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						size='small'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='oneInfo'>
					<h3>공간 한 줄 소개</h3>
					<TextField
						id='outlined-full-width'
						style={{margin: 8}}
						placeholder='공간의 특장점을 한 문장으로 작성해주세요'
						fullWidth
						required
						margin='normal'
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						size='small'
						value={oneIntroduction}
						onChange={(e) => setOneIntroduction(e.target.value)}
					/>
				</div>
				<div className='fullInfo'>
					<h3>공간 소개</h3>
					<TextField
						id='outlined-multiline-static'
						placeholder='게스트들에게 필요한 공간 정보를 상세하게 소개해주세요.'
						fullWidth
						required
						rows={4}
						variant='outlined'
						size='small'
						value={fullIntroduction}
						onChange={(e) => setFullIntroduction(e.target.value)}
					/>
				</div>
				<div className='thum'>
					<div className='input-group'>
						<h3>대표이미지</h3>
						<input
							type='file'
							id='filephoto'
							style={{visibility: 'hidden'}}
							onChange={photoUploadEvent}
							required
						/>
						<span
							onClick={() => {
								document.getElementById('filephoto').click();
							}}
						>
							<b style={{cursor: 'pointer'}}>사진 추가</b>
						</span>
					</div>
					{/* 사진출력 */}
					<br />
					<div className='previewimg'>
						<img
							alt=''
							src={imageUrl + thumbnailImage}
							style={{maxWidth: '300px'}}
						/>
					</div>
				</div>
				<div className='addr'>
					<h3>주소입력</h3>
					<div className='input-group'>
						<TextField
							id='outlined-full-width'
							style={{margin: 8, width: '600px'}}
							margin='normal'
							required
							placeholder='주소 검색 버튼 클릭'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							value={address}
						/>
						<Button
							variant='contained'
							onClick={handle.clickButton}
						>
							주소검색
						</Button>
					</div>
					<TextField
						id='outlined-full-width'
						style={{margin: 8}}
						margin='normal'
						placeholder='상세주소를 입력해주세요'
						fullWidth
						required
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						size='small'
						value={address2}
						onChange={(e) => setAddress2(e.target.value)}
					/>
				</div>
				{/* 다이얼로그 */}
				<BootstrapDialog
					onClose={handleClose}
					aria-labelledby='customized-dialog-title'
					open={open}
				>
					<BootstrapDialogTitle
						id='customized-dialog-title'
						onClose={handleClose}
						style={{width: '500px'}}
					>
						카카오 주소 검색
					</BootstrapDialogTitle>
					<DialogContent dividers>
						<Typography gutterBottom>
							{openPostcode && (
								<DaumPostcode
									onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
									autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
									// defaultQuery='강남대로 24길' // 팝업을 열때 기본적으로 입력되는 검색어
								/>
							)}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={handleClose}>
							Close
						</Button>
					</DialogActions>
				</BootstrapDialog>
				<div className='buttonEvent'>
					<Button variant='contained' color='primary' type='submit'>
						저장
					</Button>
					<Button
						variant='contained'
						color='secondary'
						type='button'
						onClick={() => {
							navi(-1);
						}}
					>
						취소
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SpaceAddForm;
