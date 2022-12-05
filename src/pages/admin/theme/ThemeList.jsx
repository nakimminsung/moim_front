import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RoomList from './RoomList';
import {useState} from 'react';
import AddThemeRoom from './AddThemeRoom';
import UpdateTheme from './UpdateTheme';
import axios from 'axios';
import Button from '@mui/material/Button';

function Row(props) {
	const {row} = props;
	const [open, setOpen] = useState(false);

	const deleteTheme = (num) => {
		let url = localStorage.url + '/theme/delete?num=' + num;
		axios.delete(url).then((res) => {
			props.selectThemeList();
			alert('삭제 되었습니다.');
		});
	};

	return (
		<React.Fragment>
			<TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					<b style={{fontSize: '15px'}}>{row.title}</b>
				</TableCell>
				<TableCell align='right'>
					<AddThemeRoom themeNum={row.num} themeTitle={row.title} />
					&nbsp;
					<UpdateTheme
						themeNum={row.num}
						selectThemeList={props.selectThemeList}
					/>
					&nbsp;
					<Button
						variant='outlined'
						color='error'
						onClick={() => deleteTheme(row.num)}
					>
						기획전 삭제
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{paddingBottom: 0, paddingTop: 0}}
					colSpan={6}
				>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{margin: 1}}>
							<RoomList num={row.num} />
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function ThemeList(props) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='collapsible table'>
				<TableBody>
					{props.themeList.map((row, i) => (
						<Row
							key={i}
							row={row}
							selectThemeList={props.selectThemeList}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
