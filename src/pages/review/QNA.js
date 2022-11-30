import styled from '@emotion/styled/macro';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function QNA(props) {
	const [memberQna, setMemberQna] = useState([]);
	const [sort, setSort] = useState('order by writeday desc');

	// theme의 space list select
	const selectHostRoomList = () => {
		let userNum = jwt_decode(localStorage.getItem('token')).idx;
		let url =
			localStorage.url +
			'/reviewQna/qnaList?userNum=' +
			userNum +
			'&sort=' +
			sort;
		console.log(url);
		axios.get(url).then((res) => setMemberQna(res.data));
	};

	const handleSortChange = (e) => {
		setSort(e.target.value);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		selectHostRoomList();
	}, [sort]);

	// 아코디언 setting

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<ListWrapper>
			<SelectDiv>
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
			{memberQna.length == 0 ? (
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
			) : (
				<div style={{width: '100%'}}>
					{memberQna &&
						memberQna.map((data, idx) => (
							<Accordion
								square
								expanded={expanded === idx} //펼치기
								onChange={handleChange(idx)} //닫기
								style={{width: '100%'}}
							>
								<AccordionSummary
									aria-controls='panel1d-content'
									id='panel1d-header'
								>
									<Typography>
										{idx + 1}. {data.question}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										{data.answer == null
											? '아직 호스트가 답변을 하지 않았습니다'
											: data.answer}
									</Typography>
								</AccordionDetails>
							</Accordion>
						))}
				</div>
			)}
		</ListWrapper>
	);
}

export default QNA;
const ListWrapper = styled(Box)`
	padding-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	align-items: flex-start;
`;
//아코디언 css
const Accordion = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, .03)',
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);
