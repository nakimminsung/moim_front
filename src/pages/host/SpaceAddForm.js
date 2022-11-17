import {styled, TextField} from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import DaumPostcode from 'react-daum-postcode';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button';
import styled1 from 'styled-components';

// import Geocode from 'react-geocode';

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

	// //주소 위도 경도 얻기
	// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
	// Geocode.setLanguage('en');
	// Geocode.setRegion('es');
	// Geocode.enableDebug();

	// const [geom, setGeom] = useState();

	// const GoogleMap = async (currentAddr) => {
	// 	return Geocode.fromAddress(currentAddr)
	// 		.then((res) => {
	// 			const {lat, lng} = res.results[0].geomety.location;
	// 			console.log('lat=' + lat);
	// 			console.log('lng=' + lng);
	// 			return {lat, lng};
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// const handleButton = async (props) => {
	// 	const currentAddr = document.getElementById('address').value;
	// 	if (currentAddr) {
	// 		const {lat, lng} = await GoogleMap(currentAddr);
	// 		setGeom({lat: lat, lng: lng});
	// 	}
	// };

	return (
		<div>
			{/* <button onClick={handleButton}>위도경도</button> */}
			<form onSubmit={onSubmitEvent}>
				<div>
					<div
						className='input-group'
						style={{
							position: 'relative',
							width: '100%',
							borderBottom: '3px solid #704de4',
							borderBottomWidth: '4px',
							fontSize: '16px',
							lineHeight: '20px',
							paddingBottom: '26px',
						}}
					>
						<h3
							style={{
								fontSize: '26px',
								lineHeight: '26px',
								fontWeight: '400',
							}}
						>
							공간 정보를 입력해주세요.
						</h3>
						<span
							style={{
								verticalAlign: 'top',
								position: 'absolute',
								color: '#656565',
								right: '0',
								lineHeight: '14px',
								fontSize: '16px',
								top: '1px',
							}}
						>
							<span
								style={{verticalAlign: 'top', color: '#ff3a48'}}
							>
								<IcoRequired>*</IcoRequired> 필수입력
							</span>
						</span>
					</div>
					<Space>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							공간명
						</span>
						<IcoRequired>*</IcoRequired>
						<br />
						<br />
						<TextField
							id='outlined-full-width'
							style={{margin: 8}}
							placeholder='고유 업체명을 입력해주세요. (예시) 비트캠프 701호 강의실'
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
					</Space>

					<Space className='oneInfo'>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							공간 한 줄 소개
						</span>
						<IcoRequired>*</IcoRequired>
						<TextField
							id='outlined-full-width'
							style={{margin: 8}}
							placeholder='공간의 특장점을 한 문장으로 작성해주세요.'
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
					</Space>

					<Space>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							공간 소개
						</span>
						<IcoRequired>*</IcoRequired>
						<TextField
							id='outlined-multiline-static'
							placeholder='게스트들에게 필요한 공간 정보를 상세하게 소개해주세요.'
							style={{margin: 8}}
							fullWidth
							required
							rows={4}
							variant='outlined'
							size='small'
							value={fullIntroduction}
							onChange={(e) =>
								setFullIntroduction(e.target.value)
							}
						/>
					</Space>

					<Space>
						<div className='input-group'>
							<span
								style={{fontSize: '20px', fontWeight: 'bold'}}
							>
								대표 이미지
							</span>
							<IcoRequired>*</IcoRequired>

							<BtnBox>
								<BtnLabel>
									<div>파일첨부</div>
									<input
										type='file'
										id='filephoto'
										style={{
											visibility: 'hidden',
											display: 'none',
										}}
										onChange={photoUploadEvent}
										required
										onClick={() => {
											document
												.getElementById('filephoto')
												.click();
										}}
									/>
								</BtnLabel>
							</BtnBox>
						</div>
						{/* 사진출력 */}
						<br />
						<div
							className='previewimg'
							style={{
								border: '1px solid black',
								backgroundColor: '#d3d3d3',
								height: '200px',
								display: 'flex',
								flexDirection: 'column',
								alignContent: 'flex-start',
								justifyContent: 'space-around',
								alignItems: 'flex-start',
							}}
						>
							{thumbnailImage == 0 ? null : (
								<img
									alt=''
									src={imageUrl + thumbnailImage}
									style={{
										width: '170px',
										height: '170px',
										maxWidth: '170px',
										maxHeight: '170px',
									}}
								/>
							)}
						</div>
					</Space>

					<Space>
						<span style={{fontSize: '20px', fontWeight: 'bold'}}>
							주소 (위치)
						</span>
						<IcoRequired>*</IcoRequired>
						<div className='input-group'>
							<TextField
								id='outlined-full-width'
								style={{margin: 8, width: '950px'}}
								margin='normal'
								required
								placeholder='실제 서비스되는 공간의 주소를 입력해주세요.'
								InputLabelProps={{
									shrink: true,
								}}
								variant='outlined'
								size='small'
								value={address}
							/>

							<BtnBox>
								<BtnLabel>
									<div onClick={handle.clickButton}>
										주소검색
									</div>
								</BtnLabel>
							</BtnBox>
						</div>

						<TextField
							id='outlined-full-width'
							style={{margin: 8}}
							margin='normal'
							placeholder='상세주소를 입력해주세요.'
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
					</Space>
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
				</div>
				<br />
				<br />
				<br />
				<ButtonEvent>
					<BtnEventWrap>
						<BtnWrap
							typy='button'
							style={{
								cursor: 'pointer',
								backgroundColor: '#4d4d4d',
							}}
							onClick={() => {
								navi(-1);
							}}
						>
							이전
						</BtnWrap>
					</BtnEventWrap>
					<BtnEventWrap>
						<BtnWrap
							type='submit'
							style={{backgroundColor: '#ff3a48'}}
							onClick={onSubmitEvent}
						>
							다음
						</BtnWrap>
					</BtnEventWrap>
				</ButtonEvent>
			</form>
		</div>
	);
}

export default SpaceAddForm;

const ButtonEvent = styled1.div`
	margin: 0 auto 100px;
	width: 1380;
`;

const BtnWrap = styled1.span`
	display: block;
	width: 100%;
	border-radius: 4px;
	font-size: 20px;
	line-height: 60px;
	color: #fff;
	text-align: center;
`;

const BtnEventWrap = styled1.span`
	width: 50%;
	float: left;
	padding-right: 10px;
`;

const Space = styled1.div`
	position: relative;
	margin-top: 40px;
`;

const IcoRequired = styled1.span`
	vertical-align: top;
	color: #ff3a48;
	font-size: 20px;
`;

const BtnBox = styled1.div`
	position: absolute;
	top: 0;
	right: 0;
	margin-left: 10px;
	overflow: hidden;
	width: 154px;
	line-height: 50px;
`;

const BtnLabel = styled1.label`
cursor: pointer;
display: block;
background-color: #704de4;
border: 0;
color: #fff;
text-align: center;
border-radius: 0;
width: 100%;
height: 100%;
font-size: 20px;
line-height: 50px;
`;
