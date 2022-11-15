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

const CustomTabs = (props) => (
    <React.Fragment>
        <DateTimePickerTabs {...props} />
        <Box sx={{ backgroundColor: 'blueviolet', height: 5 }} />
    </React.Fragment>
);

function FilterMenu(props) {
    const [value, setValue] = useState(dayjs(new Date()).locale('ko'));
    const {
        roomName,
        setRoomName,
        address,
        setAddress,
        headCount,
        setHeadCount,
        sort,
        setSort,
    } = props;

    // 공간 정렬
    const handleChange = (e) => {
        setSort(e.target.value);
    };

    // 달력 테마
    const theme = createTheme(
        {
            palette: {
                primary: { main: '#9b4de3' },
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


    return (
        <Wrapper>
            <Left>
                <Card
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        minHeight: '55px',
                        padding: '0 20px',
                        position: 'relative',
                    }}
                >
                    <SearchIcon
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            color: '#a0a0a0',
                            cursor: 'pointer',
                        }}
                    />
                    <input
                        type='text'
                        placeholder='공간명 검색'
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value);
                        }}
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            border: '0px',
                        }}
                    />
                </Card>
            </Left>
            <Middle>
                <Box
                    sx={{
                        minWidth: 120,
                        width: '20%',
                        marginRight: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            지역
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={address}
                            label='지역'
                            onChange={spaceChange}
                        >
                            <MenuItem value={'서울'}>서울</MenuItem>
                            <MenuItem value={'강동'}>강동</MenuItem>
                            <MenuItem value={'부산'}>부산</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        minWidth: 120,
                        width: '20%',
                        marginRight: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            인원
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={headCount}
                            label='인원'
                            onChange={headCountChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        dateFormats={dayjs.locale('ko')}
                    >
                        <Stack spacing={3}>
                            <DateTimePicker
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                style={{ color: 'lightgray' }}
                                hideTabs={false}
                                components={{ Tabs: CustomTabs }}
                                componentsProps={{
                                    // actionBar: {
                                    // 	actions: ['today'],
                                    // },
                                    tabs: {
                                        dateRangeIcon: <LightModeIcon />,
                                        timeIcon: <AcUnitIcon />,
                                    },
                                }}
                            />
                        </Stack>
                    </LocalizationProvider>
                </ThemeProvider>
                <Box
                    style={{
                        marginLeft: '20px',
                    }}
                >
                    <FormControl
                        style={{
                            m: 1,
                            minWidth: 140,
                        }}
                    >
                        <Select
                            labelId='demo-select-small'
                            id='demo-select-small'
                            value={sort}
                            onChange={handleChange}
                        >
                            <MenuItem value={'readCount desc'}>인기순</MenuItem>
                            <MenuItem value={'weekAmPrice asc'}>
                                낮은 가격순
                            </MenuItem>
                            <MenuItem value={'weekAmPrice desc'}>
                                높은 가격순
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div
                    style={{
                        display: 'flex',
                        width: '25%',
                        justifyContent: 'flex-end',
                    }}
                >
                    <FilterButton
                        onClick={handleClick}
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <TuneIcon
                            style={{ color: '#9b4de3', fontSize: '25px;' }}
                        />
                        <Typography
                            style={{
                                marginLeft: '10px',
                                fontSize: '20px',
                                color: '#9b4de3',
                                fontWeight: '1000',
                            }}
                        >
                            필터
                        </Typography>
                    </FilterButton>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Filter />
                    </Menu>
                </div>
            </Middle>
        </Wrapper>
    );
}

export default FilterMenu;

const FilterButton = styled(Button)`
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
`;
const Wrapper = styled(Box)`
	display: flex;
	align-items: center;
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
	@media (max-width: 767px) {
		width: 45%;
	}
`;
const Middle = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding-left: 10px;
	@media (max-width: 1920px) {
		width: 80.8%;
	}
	@media (max-width: 1680px) {
		width: 76%;
	}
	@media (max-width: 767px) {
		width: 55%;
	}
`;