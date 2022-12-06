import React from 'react';
import NoneRouter from '../../Router/NoneRouter';
import './MapLayout.css';
import styled from 'styled-components';

function NoneLayout(props) {
	return (
		<Wrapper>
			<NoneRouter />
		</Wrapper>
	);
}

export default NoneLayout;

const Wrapper = styled.div`
	-ms-overflow-style: none;
`;
