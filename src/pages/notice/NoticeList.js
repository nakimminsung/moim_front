import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function NoticeList(props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div style={{width: '100%', borderTop: '2px solid gray'}}>
			<Accordion
				expanded={expanded === 'panel1'} //펼치기
				onChange={handleChange('panel1')} //닫기
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel3bh-content'
					id='panel3bh-header'
				>
					<Typography sx={{width: '15%', flexShrink: 0}}>
						<b>공지사항</b>
					</Typography>
					<Typography sx={{color: 'text.secondary'}}>
						[이벤트] 스클 X 하리무 코엑스 광고 인증샷 이벤트
						참여하고 공간쿠폰 받으세요! (~11/28)
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Nunc vitae orci ultricies, auctor nunc in, volutpat
						nisl. Integer sit amet egestas eros, vitae egestas
						augue. Duis vel est augue.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel3'}
				onChange={handleChange('panel3')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel3bh-content'
					id='panel3bh-header'
				>
					<Typography sx={{width: '15%', flexShrink: 0}}>
						<b>공지사항</b>
					</Typography>
					<Typography sx={{color: 'text.secondary'}}>
						[이벤트] 스클 X 하리무 코엑스 광고 인증샷 이벤트
						참여하고 공간쿠폰 받으세요! (~11/28)
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Nunc vitae orci ultricies, auctor nunc in, volutpat
						nisl. Integer sit amet egestas eros, vitae egestas
						augue. Duis vel est augue.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default NoticeList;
