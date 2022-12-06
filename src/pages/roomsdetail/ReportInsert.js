import React, {useState} from 'react';
import axios from 'axios';

//modal dialogue 관련
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

//modal Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//jwt user token
import jwt_decode from 'jwt-decode';

function ReportInsert(props) {
	//token 에서 userInfo 가져오기
	const userNum = localStorage.getItem('token')
		? jwt_decode(localStorage.getItem('token')).idx
		: '';

	//DetailFunction 상위에서 roomNum 가져오기
	const {roomNum} = props;

	//변수 선언
	const [reportType, setReportType] = useState('');
	const [reportContent, setReportContent] = useState('');

	//글자수 실시간 카운트
	const [textCount, setTextCount] = useState(0);

	//modal dialogue : OPEN
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	//modal dialogue : CLOSE
	const handleClose = () => {
		setOpen(false);

		//값 비워주기
		setReportType('');
		setReportContent('');
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

	//modal 내부의 radio 이벤트
	const reportTypeHandler = (e) => {
		e.preventDefault();
		setReportType(e.target.value);

		// console.log('setReportType' + e.target.value);
	};

	//modal 내부의 Content 입력 이벤트
	const reportContentHandler = (e) => {
		e.preventDefault();
		setTextCount(e.target.value.length);
		setReportContent(e.target.value);

		// console.log('setReportContent' + e.target.value);
	};

	//modal submit 이벤트
	const submitHandler = (e) => {
		e.preventDefault();

		//값이 비어있는지 체크
		if (reportType == null || reportType == '') {
			alert('유형을 선택해주시기 바랍니다');
			return;
		} else if (reportContent == null || reportContent == '') {
			alert('내용을 입력해주시기 바랍니다');
			return;
		} else {
			// BackEnd로 보낼 url
			let url = localStorage.url + '/admin/reportInsert';

			const formData = new FormData();
			formData.append('reportType', reportType);
			formData.append('reportContent', reportContent);
			formData.append('roomNum', roomNum);
			formData.append('userNum', userNum);

			console.log(reportType);
			console.log(reportContent);
			console.log('방정보' + roomNum);
			console.log('유저정보' + userNum);

			axios({
				method: 'post',
				url: url, //BackEnd로 보낼 url
				data: formData,
			}).then((res) => {
				alert('신고가 접수되었습니다.');

				//성공하고 비워주기
				setReportType('');
				setReportContent('');

				window.location.reload();
			});

			//성공하고 modal 창 닫기
			setOpen(false);
		}
	};

	return (
		<div>
			<span
				class='material-symbols-outlined'
				style={{
					fontSize: 'xx-large',
					cursor: 'pointer',
				}}
				onClick={handleClickOpen}
			>
				e911_emergency
			</span>

			{/* Dialogue Modal 화면 : 신고 작성 INSERT 폼 */}
			{/* Dialogue Modal 화면 : 공지사항 작성 INSERT 폼 */}
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
							신고 접수
						</DialogTitle>

						<DialogContent>
							<DialogContentText
								style={{width: '600px', color: 'black'}}
							>
								<span>
									<p>안녕하세요, 게스트님. </p>
									<p>
										공간을 이용하시면서 불편한 점이
										있으셨나요?
									</p>

									<p>
										공간을 이용하는 과정에서 어떤 문제가
										발생하셨다면, <b>'모임'</b> 에
										알려주세요 :)
									</p>
								</span>
							</DialogContentText>
							{/* <br /> */}
							<FormControl
								className={classes.formControl}
								style={{marginLeft: '-0px'}}
							>
								<FormControl component='fieldset'>
									<br />
									<span style={{color: 'gray'}}>
										문의 유형
									</span>
									<RadioGroup
										aria-label='reportType'
										name='reportType1'
										value={reportType}
										onChange={reportTypeHandler}
									>
										<FormControlLabel
											value='예약관리 부주의'
											control={<Radio />}
											label='호스트의 예약관리 부주의로 공간 이용 불가능'
										/>
										<FormControlLabel
											value='불쾌한 태도'
											control={<Radio />}
											label='호스트의 불쾌한 태도 (예: 욕설, 위협, 차별 등)'
										/>
										<FormControlLabel
											value='외부결제 유도'
											control={<Radio />}
											label='호스트의 외부결제 유도 (예: 송금, 계좌이체, 타 서비스 결제 등)'
										/>
										<FormControlLabel
											value='정보 불일치'
											control={<Radio />}
											label='공간 정보 및 이미지에 문제가 있음 (예: 실제와 다름, 개인정보 유출 등)'
										/>
									</RadioGroup>
								</FormControl>
								<br />
							</FormControl>

							<br />
							<div
								style={{
									marginBottom: '10px',
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<span style={{color: 'gray'}}>문의 내용</span>
								<span style={{color: 'gray'}}>
									{textCount} / 200자
								</span>
							</div>

							<textarea
								maxLength={200}
								className='form-control'
								placeholder='내용을 입력해주시기 바랍니다.'
								style={{height: '180px'}}
								onChange={reportContentHandler}
								value={reportContent}
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

export default ReportInsert;
