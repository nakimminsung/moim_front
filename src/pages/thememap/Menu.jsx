import React from 'react';
import {Box} from '@mui/material';
import styled from '@emotion/styled/macro';
import Filter from './Filter';
import SpaceFilter from './SpaceFilter';
import HeadFilter from './HeadFilter';
import DateFilter from './DateFilter';
import SortFilter from './SortFilter';
import Search from './Search';

function TopMenu(props) {
	const {
		setRoomName,
		setAddress,
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

	return (
		<Wrapper>
			<Left>
				<Search setRoomName={setRoomName} />
			</Left>
			<Middle>
				<MiddleBox>
					<SpaceFilter setAddress={setAddress} />
					<HeadFilter setHeadCount={setHeadCount} />
					<DateFilter
						setHoliday={setHoliday}
						setStime={setStime}
						setEtime={setEtime}
					/>
					<SortFilter sort={sort} setSort={setSort} />
				</MiddleBox>
				<Right>
					<Filter
						setPayment={setPayment}
						setSprice={setSprice}
						setEprice={setEprice}
						setFacility={setFacility}
					/>
				</Right>
			</Middle>
		</Wrapper>
	);
}

export default TopMenu;

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
