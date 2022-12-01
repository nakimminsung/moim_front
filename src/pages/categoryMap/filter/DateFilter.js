import React, { useState, useRef, useEffect } from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ko';
import { koKR } from '@mui/x-date-pickers';
import { CalendarPicker } from '@mui/x-date-pickers';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import EventIcon from '@material-ui/icons/Event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

// button theme
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function DateFilter(props) {
    // date format
    const [date, setDate] = useState(dayjs(new Date()).locale('ko'));
    // time
    const [time, setTime] = useState([0, 24]);
    const stimeRef = useRef('');
    const etimeRef = useRef('');
    // theme
    const classes = useStyles();
    // open & close
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);
    // 달력 테마
    const theme = createTheme(
        {
            palette: {
                primary: { main: '#9b4de3' },
            },
        },
        koKR,
    );
    // open
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    // close
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    // 시간 필터
    const handleChange = (event, newValue) => {
        setTime(newValue);
        stimeRef.current = time[0];
        etimeRef.current = time[1];
    };
    // 초기화 버튼 이벤트
    const initRun = () => {
        setTime([0, 24]);
        props.setHoliday('');
    };
    // 일정 적용하기 버튼 이벤트
    const filterRun = (e) => {
        handleClose(e);
        let holiday = new Date(date.$d);
        props.setHoliday(holiday.getDay());
        props.setStime(stimeRef.current);
        props.setEtime(etimeRef.current);
    };

    // return focus to the button when we transitioned from !open -> open
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <DateButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
            >
                <span>날짜</span>
                <EventIcon />
            </DateButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id='menu-list-grow'
                                    style={{ padding: '0' }}
                                >
                                    <ThemeProvider theme={theme}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <CalendarPicker
                                                date={date}
                                                onChange={(newDate) =>
                                                    setDate(newDate)
                                                }
                                                componentsProps={{
                                                    actionBar: {
                                                        actions: ['today'],
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                        <InnerWrapper>
                                            <Slider
                                                getAriaLabel={() =>
                                                    'Temperature range'
                                                }
                                                value={time}
                                                marks={marks}
                                                onChange={handleChange}
                                                valueLabelDisplay='on'
                                                style={{ color: '#9b4de3' }}
                                                step={1}
                                                max={24}
                                            />
                                        </InnerWrapper>
                                        <ButtonWrapper>
                                            <CancelButton
                                                variant='secondary'
                                                onClick={() => {
                                                    initRun();
                                                }}
                                            >
                                                초기화
                                            </CancelButton>
                                            <SubmitButton
                                                variant='secondary'
                                                onClick={(e) => filterRun(e)}
                                            >
                                                일정 적용하기
                                            </SubmitButton>
                                        </ButtonWrapper>
                                    </ThemeProvider>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

const DateButton = styled.button`
	border: 1px solid lightgray;
	width: 100px;
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
	margin-right: 10px;
	font-size: 15px;
	color: #808080;
	background-color: #fff;
	border-radius: 5px;
	align-items: center;
	padding-left: 20px;
	@media (max-width: 1920px) {
		width: 250px;
	}
	@media (max-width: 1680px) {
		width: 250px;
	}
	@media (max-width: 1000px) {
		width: 150px;
	}
	@media (max-width: 900px) {
		width: 150px;
	}
`;
const InnerWrapper = styled(Box)`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
const ButtonWrapper = styled(Box)`
	position: relative;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
const CancelButton = styled.button`
	background-color: #f0f0f0;
	width: 30%;
	border-radius: 0;
	height: 60px;
	font-size: 20px;
	border: 0;
`;
const SubmitButton = styled.button`
	background-color: #9b4de3;
	width: 70%;
	border-radius: 0;
	height: 60px;
	font-size: 20px;
	color: yellow;
	border: 0;
`;

const marks = [
    {
        value: 0,
    },
    {
        value: 6,
    },
    {
        value: 12,
    },
    {
        value: 18,
    },
    {
        value: 24,
    },
];
