import React from 'react';
import styled from 'styled-components';
import AddTheme from './AddTheme';

function Top(props) {
	return (
		<Wrapper>
			<AddTheme />
		</Wrapper>
	);
}

export default Top;

const Wrapper = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
`;
