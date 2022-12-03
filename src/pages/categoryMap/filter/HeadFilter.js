import React, { useState, useRef, useEffect } from 'react';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { ButtonGroup, MenuList } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// button theme
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function HeadFilter(props) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(1);
    const classes = useStyles();
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

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

    // 초기화 버튼 이벤트
    const initRun = () => {
        setCount(1);
    };
    // 필터 적용하기 버튼 이벤트
    const filterRun = (e) => {
        props.setHeadCount(count);
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
            <HeadButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
            >
                <span>인원</span>
                <ArrowDropDownIcon />
            </HeadButton>
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
                                    <InnerWrapper>
                                        <span>인원</span>
                                        <CountWrapper>
                                            <ButtonGroup aria-label='outlined primary button group'>
                                                <CountButton
                                                    onClick={() =>
                                                        setCount(
                                                            count > 1
                                                                ? count - 1
                                                                : 1,
                                                        )
                                                    }
                                                >
                                                    -
                                                </CountButton>
                                                <CountInput
                                                    value={count}
                                                    onChange={(e) =>
                                                        setCount(e.target.value)
                                                    }
                                                />
                                                <CountButton
                                                    onClick={() =>
                                                        setCount(count + 1)
                                                    }
                                                >
                                                    +
                                                </CountButton>
                                            </ButtonGroup>
                                        </CountWrapper>
                                    </InnerWrapper>
                                    <ButtonWrapper>
                                        <CancelButton
                                            variant='secondary'
                                            onClick={() => initRun()}
                                        >
                                            초기화
                                        </CancelButton>
                                        <SubmitButton
                                            variant='secondary'
                                            onClick={() => {
                                                handleClose(false);
                                                filterRun();
                                            }}
                                        >
                                            인원 적용하기
                                        </SubmitButton>
                                    </ButtonWrapper>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

const HeadButton = styled.button`
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
	> span {
		font-size: 17px;
		margin-bottom: 10px;
		font-weight: 500;
	}
`;
const ButtonWrapper = styled(Box)`
	position: relative;
	bottom: 0;
	width: 300px;
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
const CountWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	padding: 20px 0;
`;
const CountButton = styled.button`
	background-color: #9b4de3;
	color: white;
	font-size: 15px;
	width: 35px;
	height: 35px;
	padding: 0;
	border: 0;
	border-radius: 5px;
`;
const CountInput = styled.input`
	width: 50px;
	border: 1px solid #d0d0d0;
	text-align: center;
`;
