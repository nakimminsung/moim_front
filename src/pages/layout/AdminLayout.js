import React, {useState} from 'react';
import AdminRouter from '../../Router/AdminRouter';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import './AdminLayout.css';

import {makeStyles, Typography} from '@material-ui/core';
import AdminMenu from '../admin/AdminMenu';

function AdminLayout(props) {
	const [topMenu, setTopMenu] = useState('');

	const useStyles = makeStyles((theme) => ({
		link: {
			display: 'flex',
		},
		icon: {
			marginRight: theme.spacing(0.5),
			width: 20,
			height: 20,
		},
	}));

	function handleClick(event) {
		event.preventDefault();
		console.info('You clicked a breadcrumb.');
	}

	const classes = useStyles();
	return (
		// 전체 div에 대한 css
		<div
			style={{
				display: 'flex',
				justifyContent: 'start',
				backgroundColor: 'rgba(240, 242, 245)',
				minHeight: '100vh',
				height: 'auto',
			}}
		>
			{/* 좌측 Admin Menu 호출 */}
			<div
				style={{
					width: '17%',
					// minWidth: '300px',
				}}
			>
				<AdminMenu topMenu={topMenu} setTopMenu={setTopMenu} />
			</div>

			{/* Breadcrumbs 상단 경로 */}
			<div style={{marginTop: '20px', width: '80%'}}>
				<div
					style={{
						width: '80%',
						// border: '0.5px solid gray',
						// border: '1.5px solid #704de4',
						border: 'none',
						borderRadius: '10px',
						height: '100px',
						paddingLeft: '10px',
						paddingTop: '10px',
						marginBottom: '20px',

						backgroundColor: 'white',
						// boxShadow: '3px 3px 3px rgba(0 0 0 / 10%)',
						boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',

						position: 'fixed',
						opacity: '0.9',
					}}
				>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link
							color='inherit'
							href='/admin'
							// onClick={handleClick}
							className={classes.link}
						>
							<HomeIcon className={classes.icon} />
							Admin Main
						</Link>
						<Link
							color='inherit'
							href='/admin/member'
							onClick={handleClick}
							className={classes.link}
						>
							<WhatshotIcon className={classes.icon} />
							회원 관리
						</Link>
						<Typography
							color='textPrimary'
							className={classes.link}
						>
							<GrainIcon className={classes.icon} />
							게스트 회원
						</Typography>
					</Breadcrumbs>
					<span>
						<GrainIcon className={classes.icon} />
						게스트 회원
					</span>
				</div>

				{/* 하위 컴포넌트 호출 */}
				<div style={{marginTop: '120px', width: '100%'}}>
					<AdminRouter />
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
