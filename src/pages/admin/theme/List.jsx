import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import ListDetail from './ListDetail';

function List(props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div>
			{props.themeList &&
				props.themeList.map((item, i) => (
					<AccordionWrapper
						expanded={expanded === 'panel' + i}
						onChange={handleChange('panel' + i)}
						key={i}
						style={{backgroundImage: `url(${item.bannerImage})`}}
					>
						<AccordionSummary
							expandIcon={
								<ExpandMoreIcon style={{color: 'white'}} />
							}
							aria-controls={'accordion' + i}
							id={'accordion' + i}
						>
							<ThemeTitle>{item.title}</ThemeTitle>
						</AccordionSummary>
						<AccordionDetails>
							<ListDetail num={item.num} />
						</AccordionDetails>
					</AccordionWrapper>
				))}
		</div>
	);
}

export default List;

const AccordionWrapper = styled(Accordion)`
	margin-bottom: 10px;
	background-position: center;
	opacity: 0.5 black;
`;
const ThemeTitle = styled.b`
	color: white;
	font-size: 20px;
	text-shadow: 1px 1px 1px gray;
`;
