import styled from '@emotion/styled/macro';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {Card, CardActionArea, CardContent, Typography} from '@material-ui/core';
import HostQnaContent from './HostQnaContent';
import HostQnaUpdate from './HostQnaUpdate';
import './HostRQ.css';
import Pagination from 'react-js-pagination';

function HostQna(props) {
	const [hostQna, setHostQna] = useState([]);
	const [sort, setSort] = useState('order by writeday desc');

	//해당 호스트 Qna 리스트
	const selectHostRoomList = () => {
		const hostNum = sessionStorage.num;
		let url =
			localStorage.url + '/hostQna?hostNum=' + hostNum + '&sort=' + sort;
		axios.get(url).then((res) => setHostQna(res.data));
	};

	const handleSortChange = (e) => {
		setSort(e.target.value);
	};

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	//페이징처리
	//pagenation
	const [page, setPage] = useState(1);
	let items = 6;

	const handlePageChange = (page) => {
		setPage(page);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		selectHostRoomList();
	}, [sort]);

	return (
		<ListWrapper>
			<SelectDiv>
				<span className='memberCount'>총 {hostQna.length}개</span>
				<FormControl sx={{m: 1, minWidth: 120}} size='small'>
					<Select
						labelId='demo-select-small'
						id='demo-select-small'
						value={sort}
						onChange={handleSortChange}
					>
						<MenuItem value={'order by writeday desc'}>
							최신순
						</MenuItem>
						<MenuItem
							value={
								'and answer is not null order by writeday asc'
							}
						>
							답글있음
						</MenuItem>
						<MenuItem
							value={'and answer is null order by writeday asc'}
						>
							답글없음
						</MenuItem>
					</Select>
				</FormControl>
			</SelectDiv>
			<ReviewList>
				<CardWrapper>
					{hostQna.length == 0 ? (
						<Wrapper>
							<h5
								style={{
									height: '300px',
									width: '100%',
									lineHeight: '300px',
									textAlign: 'center',
								}}
							>
								<b>현재 등록된 Q&A가 없습니다.</b>
							</h5>
						</Wrapper>
					) : (
						hostQna &&
						hostQna
							.slice(
								items * (page - 1),
								items * (page - 1) + items,
							)
							.map((item, index) => (
								<Card style={{width: '100%'}}>
									<CardActionArea style={{cursor: 'auto'}}>
										<CardContent>
											<Typography
												gutterBottom
												component='div'
												style={{
													fontWeight: 'bold',
													borderBottom:
														'1px solid #7b68ee',
													paddingBottom: '10px',
												}}
											>
												<Status
													style={{
														backgroundColor:
															item.status ==
															'답변완료'
																? '#afafaf'
																: '#704de4',
													}}
												>
													{item.status}
												</Status>
											</Typography>
											<Typography
												variant='body1'
												component='div'
												color='text.secondary'
												style={{marginTop: '25px'}}
											>
												<Space>
													공간명 :
													<span
														style={{
															textDecoration:
																'underline',
															color: '#7b68ee',
															cursor: 'pointer',
														}}
														onClick={() => {
															window.location.href =
																'http://localhost:3000/detail/' +
																item.roomNum;
														}}
													>
														{item.name}
													</span>
												</Space>
												<SpaceContent>
													{item.title}
												</SpaceContent>
												<SpaceWriteday>
													{item.writeday}
												</SpaceWriteday>
											</Typography>
										</CardContent>
										{item.status == '답변대기중' ? (
											<div
												style={{
													display: 'flex',
													width: '100%',
													flexDirection: 'row',
													flexWrap: 'wrap',
													justifyContent:
														'space-evenly',
													marginBottom: '20px',
												}}
											>
												<HostQnaUpdate
													qnaNum={item.num}
													status={item.status}
												/>
												<HostQnaContent
													qnaNum={item.num}
												/>
											</div>
										) : (
											<div
												style={{
													display: 'flex',
													width: '100%',
													flexDirection: 'row',
													flexWrap: 'wrap',
													justifyContent:
														'space-evenly',
													marginBottom: '20px',
												}}
											>
												<HostQnaContent
													qnaNum={item.num}
													status={item.status}
												/>
											</div>
										)}
									</CardActionArea>
								</Card>
							))
					)}
				</CardWrapper>
			</ReviewList>
			<div>
				<Pagination
					activePage={page}
					itemsCountPerPage={6}
					totalItemsCount={hostQna.length}
					pageRangeDisplayed={5}
					prevPageText={'‹'}
					nextPageText={'›'}
					onChange={handlePageChange}
				/>
			</div>
		</ListWrapper>
	);
}

export default HostQna;
const ListWrapper = styled(Box)`
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
`;
const ReviewList = styled(Box)`
	// display: grid;
	width: 100%;
`;
const CardWrapper = styled(Typography)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px 20px;
`;
const Wrapper = styled(Typography)`
	grid-column: span 3;
`;

const Space = styled(Typography)`
	font-weight: bold;
	font-family: 'NanumSquareRound';
`;
const SpaceContent = styled(Typography)`
	font-size: 16px;
	margin-top: 10px;
	font-family: 'NanumSquareRound';
`;
const SpaceWriteday = styled(Typography)`
	color: #b2b2b2;
	font-size: 13px;
	margin-top: 10px;
`;
const Status = styled(Typography)`
	width: auto;
	margin: 7px 7px 7px 0;
	padding: 0 15px;
	height: 29px;
	font-size: 12px;
	line-height: 29px;
	border-radius: 29px;
	display: inline-block;
	border: 1px solid #e0e0e0;
	color: #fff;
`;
