import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {Button, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

function Filter(props) {
	const {
		setPayment,
		setSprice,
		setEprice,
		setRoomName,
		setSearch,
		setAnchorEl,
		setFacility,
	} = props;
	const [data, setData] = useState([]);
	const [value, setValue] = useState([0, 100000000]);
	const [now, setNow] = useState(false);
	const [fix, setFix] = useState(false);
	const [checked, setChecked] = useState(true);
	const [facilityList, setFacilityList] = useState([]);
	const payRef = useRef('');
	const spriceRef = useRef('');
	const epriceRef = useRef('');

	// 편의시설
	const onCheckedElement = (checked, item) => {
		if (checked) {
			setFacilityList([...facilityList, item]);
		} else if (!checked) {
			setFacilityList(facilityList.filter((el) => el !== item));
		}
	};
	const handleFacilityChecked = (event) => {
		setChecked(event.target.checked);
	};
	// 결제유형 체크박스 이벤트
	const handleChecked = (event) => {
		setChecked(event.target.checked);
		setNow(false);
		setFix(false);
	};
	// 가격 필터
	const handleChange = (event, newValue) => {
		setValue(newValue);
		spriceRef.current = value[0];
		epriceRef.current = value[1];
	};
	// 편의시설 select
	const selectFacility = () => {
		let url = localStorage.url + '/facility/select';
		axios.get(url).then((res) => setData(res.data));
	};
	// 초기화 버튼 이벤트
	const initRun = () => {
		// 결제유형
		setChecked(true);
		setNow(false);
		setFix(false);
		payRef.current = '';
		// 가격
		setValue([0, 500000]);
		spriceRef.current = 0;
		epriceRef.current = 500000;
		// 검색어
		setRoomName('');
		setSearch('');
		// 편의시설
		setFacilityList([]);
	};
	// 필터 적용하기 버튼 이벤트
	const filterRun = () => {
		setPayment(payRef.current);
		setSprice(spriceRef.current);
		setEprice(epriceRef.current);
		setFacility(facilityList);
	};
	useEffect(() => {
		selectFacility();
	}, []);

	return (
		<Wrapper>
			<InnerWrapper>
				<PayTitleWrapper>
					<Title>결제유형</Title>
					<Typography>
						<Checkbox
							id='checkInit'
							name='check'
							color='secondary'
							defaultChecked
							checked={checked}
							onChange={handleChecked}
						/>
						모든결제
					</Typography>
				</PayTitleWrapper>
				<PayButtonWrapper>
					<div class='pay-btn'>
						<input
							id='radio-1'
							type='radio'
							name='pay'
							value='now'
							checked={now}
						/>
						<label
							for='radio-1'
							onClick={() => {
								payRef.current = '바로결제';
								setNow(true);
								setFix(false);
								setChecked(false);
							}}
						>
							바로 결제
						</label>
					</div>
					<div class='pay-btn'>
						<input
							id='radio-2'
							type='radio'
							name='pay'
							value='fix'
							checked={fix}
						/>
						<label
							for='radio-2'
							onClick={() => {
								payRef.current = '승인결제';
								setNow(false);
								setFix(true);
								setChecked(false);
							}}
						>
							승인 결제
						</label>
					</div>
				</PayButtonWrapper>
			</InnerWrapper>
			<InnerWrapper>
				<Title>가격</Title>
				<Box
					sx={{
						width: '93%',
						margin: '10px',
						marginTop: '25px',
					}}
				>
					<Slider
						getAriaLabel={() => 'Temperature range'}
						value={value}
						marks={marks}
						onChange={handleChange}
						valueLabelDisplay='on'
						style={{color: '#9b4de3'}}
						step={10000}
						max={500000}
					/>
				</Box>
			</InnerWrapper>
			<InnerWrapper>
				<Title>편의시설</Title>
				<Option>
					{data &&
						data.map((item, i) => (
							<div class='facility-btn' key={i}>
								<input
									id={`facility-${item.num}`}
									type='checkbox'
									name='facility'
									value={item.num}
									onChange={(e) => {
										onCheckedElement(
											e.target.checked,
											e.target.value,
										);
										handleFacilityChecked(e);
									}}
								/>
								<label for={`facility-${item.num}`}>
									{item.fname}
								</label>
							</div>
						))}
				</Option>
			</InnerWrapper>
			<ButtonWrapper>
				<CancelButton variant='secondary' onClick={() => initRun()}>
					초기화
				</CancelButton>
				<SubmitButton
					variant='secondary'
					onClick={() => {
						setAnchorEl(null);
						filterRun();
					}}
				>
					필터 적용하기
				</SubmitButton>
			</ButtonWrapper>
		</Wrapper>
	);
}

export default Filter;

const Wrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 350px;
`;
const InnerWrapper = styled(Box)`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
const PayTitleWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	align-items: center;
`;
const Title = styled(Typography)`
	font-size: 20px;
	margin-bottom: 10px;
`;
const PayButtonWrapper = styled(Box)`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
const Option = styled(Box)`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	max-height: 300px;
	justify-content: space-between;
`;
const ButtonWrapper = styled(Box)`
	position: relative;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
const CancelButton = styled(Button)`
	background-color: #f0f0f0;
	width: 30%;
	border-radius: 0;
	height: 60px;
	font-size: 20px;
`;
const SubmitButton = styled(Button)`
	background-color: #9b4de3;
	width: 70%;
	border-radius: 0;
	height: 60px;
	font-size: 20px;
	color: yellow;
	:hover {
		color: #9b4de3;
	}
`;
const marks = [
	{
		value: 0,
	},
	{
		value: 50000,
	},
	{
		value: 100000,
	},
	{
		value: 150000,
	},
	{
		value: 200000,
	},
	{
		value: 250000,
	},
	{
		value: 300000,
	},
	{
		value: 350000,
	},
	{
		value: 400000,
	},
	{
		value: 450000,
	},
	{
		value: 500000,
	},
];
