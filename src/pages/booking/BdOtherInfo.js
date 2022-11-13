import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import agreementData from './agreementData';
import InfoIcon from '@mui/icons-material/Info';

function BdOtherInfo(props) {
	const [hostInfo, setHostInfo] = useState([]);
	const [precaution, setPrecaution] = useState([]);
	const [agreement, setAgreement] = useState(agreementData);
	// checkbox
	const [allCheck, setAllCheck] = useState(false);
	const [agreeCheck1, setAgreeCheck1] = useState(false);
	const [agreeCheck2, setAgreeCheck2] = useState(false);
	const [agreeCheck3, setAgreeCheck3] = useState(false);

	const selectHostInfo = () => {
		const url = `http://localhost:9000/host/list?num=${props.hostNum}`;
		const pUrl = `http://localhost:9000/detailInfo?num=${props.roomNum}`;

		axios.get(url).then((res) => {
			//console.log(res.data);
			setHostInfo(res.data);
		});

		axios.get(pUrl).then((res) => {
			//console.log(res.data.pre);
			setPrecaution(res.data.pre);
		});
	};

	const allBtnEvent = () => {
		if (allCheck === false) {
			setAllCheck(true);
			setAgreeCheck1(true);
			setAgreeCheck2(true);
			setAgreeCheck3(true);
		} else {
			setAllCheck(false);
			setAgreeCheck1(false);
			setAgreeCheck2(false);
			setAgreeCheck3(false);
		}
	};

	const BtnEvent1 = () => {
		if (agreeCheck1 === false) {
			setAgreeCheck1(true);
		} else {
			setAgreeCheck1(false);
		}
	};

	const BtnEvent2 = () => {
		if (agreeCheck2 === false) {
			setAgreeCheck2(true);
		} else {
			setAgreeCheck2(false);
		}
	};

	const BtnEvent3 = () => {
		if (agreeCheck3 === false) {
			setAgreeCheck3(true);
		} else {
			setAgreeCheck3(false);
		}
	};

	useEffect(() => {
		if (props.hostNum !== '') {
			selectHostInfo();
		}
	}, [props.hostNum]); // 값 바뀔때 다시 호출

	useEffect(() => {
		if (
			agreeCheck1 === true &&
			agreeCheck2 === true &&
			agreeCheck3 === true
		) {
			setAllCheck(true);
		} else {
			setAllCheck(false);
		}
	}, [agreeCheck1, agreeCheck2, agreeCheck3]);

	return (
		<>
			<div
				style={{
					display: 'flex',
					borderBottom: '3px solid #704de4',
					marginTop: '30px',
				}}
			>
				<h4>호스트 정보</h4>
			</div>
			<p style={{marginTop: '10px'}}>
				대표자명
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				{hostInfo.companyName}
			</p>
			<p>
				소재지
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				{hostInfo.address}
			</p>
			<p>
				사업자번호
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				{hostInfo.businessNumber}
			</p>
			<p>
				연락처
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				{hostInfo.phone}&nbsp;&nbsp;&nbsp;&nbsp;{hostInfo.email}
			</p>
			<div
				style={{
					display: 'flex',
					borderBottom: '3px solid #704de4',
					marginTop: '30px',
				}}
			>
				<h4>예약시 주의사항</h4>
			</div>
			{precaution &&
				precaution.map((item, idx) => (
					<p style={{marginTop: '10px'}} key={idx}>
						{idx + 1}.&nbsp;&nbsp;{item}
					</p>
				))}
			<div
				style={{
					display: 'flex',
					borderBottom: '3px solid #704de4',
					marginTop: '30px',
				}}
			>
				<h4>서비스 동의</h4>
				<input
					type='checkbox'
					id='all-check'
					style={{
						marginLeft: 'auto',
						color: 'red',
					}}
					checked={allCheck}
					onChange={allBtnEvent}
				/>
				&nbsp;
				<label for='all-check'>전체동의</label>
			</div>

			<div>
				<Accordion>
					<AccordionSummary
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography>
							<input
								type='checkbox'
								id='check1'
								className='chk_box'
								checked={agreeCheck1}
								onChange={BtnEvent1}
							/>
							&nbsp;위 공간의 예약조건 확인 및 결제진행 동의
							<span style={{color: 'red'}}>&nbsp;(필수)</span>
						</Typography>
					</AccordionSummary>
				</Accordion>
				{agreement.map((item, idx) => (
					<Accordion key={idx}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel2a-content'
							id='panel2a-header'
						>
							{item.id === 1 ? (
								<input
									type='checkbox'
									id='check2'
									className='chk_box'
									checked={agreeCheck2}
									onChange={BtnEvent2}
								/>
							) : (
								<input
									type='checkbox'
									id='check3'
									className='chk_box'
									checked={agreeCheck3}
									onChange={BtnEvent3}
								/>
							)}
							&nbsp;{item.title}
							<span style={{color: 'red'}}>&nbsp;(필수)</span>
							<Typography></Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								{item.info.map((i, id) => (
									<p
										key={id}
										style={{
											color: 'gray',
											fontSize: 'small',
										}}
									>
										{i}
									</p>
								))}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
				<InfoIcon style={{color: 'red', fontSize: 'small'}} />
				<span style={{color: 'red', fontSize: 'small'}}>
					서비스 이용약관 동의는 필수입니다.
				</span>
			</div>
		</>
	);
}

export default BdOtherInfo;
