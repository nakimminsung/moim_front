import axios from 'axios';
import React, {useState} from 'react';
import ThemeList from './ThemeList';
import Top from './Top';
import {useEffect} from 'react';
import styled from 'styled-components';

function Theme(props) {
	const [themeList, setThemeList] = useState([]);

	const selectThemeList = () => {
		let url = localStorage.url + '/main/theme';
		axios.get(url).then((res) => setThemeList(res.data));
	};

	useEffect(() => {
		selectThemeList();
	}, []);

	return (
		<Wrapper>
			<Top selectThemeList={selectThemeList} />
			<ThemeList
				themeList={themeList}
				selectThemeList={selectThemeList}
			/>
		</Wrapper>
	);
}

export default Theme;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
