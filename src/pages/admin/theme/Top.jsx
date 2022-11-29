import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

function Top(props) {
	return (
		<Wrapper>
			<Modal />
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

const Button = styled.button`
	border-radius: 10px;
	background-color: purple;
`;
