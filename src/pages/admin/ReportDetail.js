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

function ReportDetail(props) {
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
			let url = localStorage.url + '/admin/reportUpdate';

			const formData = new FormData();
			formData.append('reportType', reportType);
			formData.append('reportContent', reportContent);
			formData.append('roomNum', roomNum);

			// console.log(reportType);
			// console.log(reportContent);
			// console.log(roomNum);

			axios({
				method: 'post',
				url: url, //BackEnd로 보낼 url
				data: formData,
				headers: {'Content-Type': 'multipart/form-data'},
			}).then((res) => {
				alert('신고가 접수되었습니다.');

				//성공하고 비워주기
				setReportType('');
				setReportContent('');
			});

			//성공하고 modal 창 닫기
			setOpen(false);
		}
	};

	return (
		<div>
			<button
				type='button'
				className='btn btn-dark'
				onClick={handleClickOpen}
			>
				상세 보기
			</button>

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
							신고 상세
						</DialogTitle>

						<DialogContent>
							<DialogContentText style={{width: '600px'}}>
								담당자는 내용을 확인하신 후 검토가 필요하다면{' '}
								<b>'처리중'</b> 상태로, <br />
								처리가 완료되면 <b>'처리 완료'</b> 상태로
								변경해주시기 바랍니다.
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
										value={'불쾌한 태도'}
										// onChange={reportTypeHandler}
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

							<span style={{color: 'gray'}}>문의 내용</span>

							<textarea
								maxLength={200}
								className='form-control'
								style={{height: '180px'}}
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

export default ReportDetail;
