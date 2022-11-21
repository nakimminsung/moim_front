import React from 'react';
import styled from 'styled-components';

function DetailQnaPage({total, limit, page, setPage}) {
	const numPage = Math.ceil(total / limit);
	return (
		<div>
			<Nav>
				<Button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
					style={{border: '1px solid lightgray'}}
				>
					&lt;
				</Button>
				{Array(numPage)
					.fill()
					.map((_, i) => (
						<Button
							key={i + 1}
							onClick={() => setPage(i + 1)}
							aria-current={page === i + 1 ? 'page' : null}
						>
							{i + 1}
						</Button>
					))}
				<Button
					onClick={() => setPage(page + 1)}
					disabled={page === numPage}
					style={{border: '1px solid lightgray'}}
				>
					&gt;
				</Button>
			</Nav>
		</div>
	);
}

export default DetailQnaPage;
const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	margin: 16px;
`;

const Button = styled.button`
	border: none;
	padding: 8px;
	margin: 0;
	background: white;
	color: #cccccc;
	font-size: 1rem;

	&:hover {
		cursor: pointer;
	}

	&[disabled] {
		background: white;
		color: #cccccc;
		cursor: pointer;
	}

	&[aria-current] {
		background: white;
		color: black;
		font-weight: bold;
		cursor: pointer;
	}
`;
