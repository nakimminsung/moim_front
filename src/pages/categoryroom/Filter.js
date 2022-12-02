import React, {useEffect, useRef, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {Box, InputLabel, Typography, Button} from '@mui/material';
import styled from '@emotion/styled/macro';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {koKR} from '@mui/x-date-pickers';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
	DateTimePicker,
	DateTimePickerTabs,
} from '@mui/x-date-pickers/DateTimePicker';
import SearchIcon from '@mui/icons-material/Search';
import {Card} from '@material-ui/core';
import TuneIcon from '@mui/icons-material/Tune';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import Menu from '@mui/material/Menu';
import Filter from './Filter';
import FilterContent from './FilterContent';
import {useNavigate, useParams} from 'react-router-dom';
import Search from './filter/Search';
import SpaceFilter from './filter/SpaceFilter';
import HeadFilter from './filter/HeadFilter';
import DateFilter from './filter/DateFilter';
import FaciFilter from './filter/FaciFilter';
import axios from 'axios';

const CustomTabs = (props) => (
	<React.Fragment>
		<DateTimePickerTabs {...props} />
		<Box sx={{backgroundColor: 'blueviolet', height: 5}} />
	</React.Fragment>
);

function Filtering(props) {
	const navi = useNavigate();
	// {num}은 router의 :num의 이름과 같아야 한다.
	const {categoryNum} = useParams();
	const searchRef = useRef('');
	const [value, setValue] = useState(dayjs(new Date()).locale('ko'));
	// 부모 컴포넌트의 변수 받기
	const {
		roomName,
		setRoomName,
		address,
		setAddress,
		headCount,
		setHeadCount,
		sort,
		setSort,
		setPayment,
		setSprice,
		setEprice,
		setFacility,
		setHoliday,
		setStime,
		setEtime,
	} = props;

	// // 공간 정렬
	// const handleChange = (e) => {
	//     setSort(e.target.value);
	// };

	// 달력 테마
	const theme = createTheme(
		{
			palette: {
				primary: {main: '#9b4de3'},
			},
		},
		koKR,
	);

	// 지역, 인원, 날짜 select
	const spaceChange = (event) => {
		setAddress(event.target.value);
	};
	const headCountChange = (event) => {
		setHeadCount(event.target.value);
	};

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	/////////////////////// 사진//////////////////////////////
	const imgUrl = 'http://localhost:9000/image/';
	// 예시로 bookingList.thunmailImage 불러옴
	const [bookingList, setBookingList] = useState([]);
	const url = `http://localhost:9000/bookingDetail/detail?bookingDetailNum=187`;
	const getBookingList = () => {
		axios.get(url).then((res) => {
			console.log(res.data);
			setBookingList(res.data);
		});
	};

	useEffect(() => {
		getBookingList();
	}, []);
	return (
		<>
			<RoomImage
				backgroundImage={`url(${imgUrl}${bookingList.thumbnailImage})`}
				// className='bkTop'
				style={{marginBottom: '30px'}}
			>
				<RoomInfo>
					<>파티룸</>
				</RoomInfo>
			</RoomImage>
			<Wrapper>
				<Left>
					{/* 공간명 검색 */}
					<Search setRoomName={setRoomName} />
				</Left>
				<Middle>
					<MiddleBox>
						{/* 지역 필터링 */}
						<SpaceFilter setAddress={setAddress} />
						{/* 인원 설정 */}
						<HeadFilter setHeadCount={setHeadCount} />
						{/* 날짜 설정 */}
						<DateFilter
							setHoliday={setHoliday}
							setStime={setStime}
							setEtime={setEtime}
						/>
					</MiddleBox>
					<Right>
						<FaciFilter
							setPayment={setPayment}
							setSprice={setSprice}
							setEprice={setEprice}
							setFacility={setFacility}
						/>
						<FilterButton
							onClick={() => {
								navi('/map/category/' + categoryNum);
							}}
							id='basic-button'
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
						>
							<MapOutlinedIcon
								style={{color: '#9b4de3', fontSize: '15px;'}}
							/>
							<Typography
								style={{
									marginLeft: '10px',
									fontSize: '15px',
									color: '#9b4de3',
									fontWeight: '1000',
								}}
							>
								지도
							</Typography>
						</FilterButton>
					</Right>

					{/* <div
                    style={{
                        display: 'flex',
                        width: '30%',
                        marginLeft: '20px',
                        justifyContent: 'flex-end',
                    }}
                >
                    {/* <FilterButton
                        onClick={handleClick}
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <TuneIcon
                            style={{ color: '#9b4de3', fontSize: '15px;' }}
                        />
                        <Typography
                            style={{
                                marginLeft: '10px',
                                fontSize: '15px',
                                color: '#9b4de3',
                                fontWeight: '1000',
                            }}
                        >
                            필터
                        </Typography>
                    </FilterButton>

                    <FilterButton
                        onClick={() => {
                            navi('/map/category/' + categoryNum);
                        }}
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MapOutlinedIcon
                            style={{ color: '#9b4de3', fontSize: '15px;' }}
                        />
                        <Typography
                            style={{
                                marginLeft: '10px',
                                fontSize: '15px',
                                color: '#9b4de3',
                                fontWeight: '1000',
                            }}
                        >
                            지도
                        </Typography>
                    </FilterButton> */}
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<FilterContent
							setPayment={setPayment}
							setSprice={setSprice}
							setEprice={setEprice}
							setFacility={setFacility}
							setAnchorEl={setAnchorEl}
							setRoomName={setRoomName}
							// setSearch={setSearch}
						/>
					</Menu>
				</Middle>
			</Wrapper>
		</>
	);
}

export default Filtering;

const Wrapper = styled(Box)`
	display: flex;
	align-items: center;
	@media (max-width: 1000px) {
		flex-direction: column;
		align-items: flex-start;
	}
	@media (max-width: 900px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;
const Left = styled(Box)`
	display: flex;
	align-items: center;
	@media (max-width: 1920px) {
		width: 19.2%;
	}
	@media (max-width: 1680px) {
		width: 24%;
	}
	@media (max-width: 1000px) {
		width: 100%;
	}
	@media (max-width: 900px) {
		width: 100%;
	}
`;
const Middle = styled(Box)`
	display: flex;
	justify-content: space-between;
	@media (max-width: 1920px) {
		width: 80.8%;
	}
	@media (max-width: 1680px) {
		width: 76%;
	}
	@media (max-width: 1000px) {
		width: 100%;
		margin-top: 10px;
	}
	@media (max-width: 900px) {
		width: 100%;
		margin-top: 10px;
	}
`;
const MiddleBox = styled(Box)`
	display: flex;
	width: 100%;
	padding-left: 10px;
	z-index: 99;
	@media (max-width: 1000px) {
		padding-left: 0;
	}
	@media (max-width: 900px) {
		padding-left: 0;
	}
`;
const Right = styled(Box)`
	display: flex;
	width: 25%;
	justify-content: flex-end;
`;
const FilterButton = styled.button`
	border: 2px solid #9b4de3;
	width: 130px;
	height: 55px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	font-weight: 1000;
	background-color: #fff;
	border-radius: 30px;
	margin-left: auto;
`;

// 사진
const RoomImage = styled.div`
	position: relative;
	color: rgba(255, 255, 255, 1);
	background-color: transparent;
	padding: 50px;
	display: grid;
	text-align: center;
	justify-content: center;
	align-items: center;
	height: 280px;
	background-image: ${(props) => props.backgroundImage};
	background-size: cover;
	background-repeat: no-repeat;
	::before {
		position: absolute;
		content: '';
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		${'' /* 마지막은 투명도 */}
		background-color: rgba(0, 0, 0, 0.4);
	}
`;

const RoomInfo = styled.h2`
	font-weight: bold;
	color: white;
	z-index: 100;
`;
