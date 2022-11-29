import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';

const actions = [
	{icon: <FileCopyIcon />, name: 'Copy'},
	{icon: <SaveIcon />, name: 'Save'},
	{icon: <PrintIcon />, name: 'Print'},
	{icon: <ShareIcon />, name: 'Share'},
];

function ScrollTop(props) {
	const {children, window} = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});
	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor',
		);
		if (anchor) {
			anchor.scrollIntoView({
				block: 'center',
			});
		}
	};
	return (
		<Fade in={trigger}>
			<Box
				onClick={handleClick}
				role='presentation'
				sx={{position: 'fixed', bottom: 16, right: 16}}
			>
				{children}
			</Box>
		</Fade>
	);
}
ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

export default function BasicSpeedDial(props) {
	return (
		<>
			<ScrollTop {...props}>
				<Fab size='small' aria-label='scroll back to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<Wrapper
				sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}
			>
				<SpeedDial
					ariaLabel='SpeedDial basic example'
					sx={{position: 'absolute', bottom: 20, right: 20}}
					icon={<MoreVertIcon />}
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
						/>
					))}
				</SpeedDial>
			</Wrapper>
		</>
	);
}

const Wrapper = styled(Box)`
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1;
`;
