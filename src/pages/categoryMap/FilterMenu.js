import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box, InputLabel, Typography, Button } from '@mui/material';
import styled from '@emotion/styled/macro';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { koKR } from '@mui/x-date-pickers';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
    DateTimePicker,
    DateTimePickerTabs,
} from '@mui/x-date-pickers/DateTimePicker';
import SearchIcon from '@mui/icons-material/Search';
import { Card } from '@material-ui/core';
import TuneIcon from '@mui/icons-material/Tune';
import Menu from '@mui/material/Menu';
import Filter from './Filter';
import Search from './filter/Search';
import SpaceFilter from './filter/SpaceFilter';
import HeadFilter from './filter/HeadFilter';
import DateFilter from './filter/DateFilter';
import SortFilter from './filter/SortFilter';

// const CustomTabs = (props) => (
//     <React.Fragment>
//         <DateTimePickerTabs {...props} />
//         <Box sx={{ backgroundColor: 'blueviolet', height: 5 }} />
//     </React.Fragment>
// );

function FilterMenu(props) {
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

export default FilterMenu;

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