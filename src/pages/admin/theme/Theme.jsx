import axios from 'axios';
import React, {useState} from 'react';
import Bottom from './Bottom';
import ThemeList from './ThemeList';
import Top from './Top';
import {useEffect} from 'react';
import styled from 'styled-components';

function Theme(props) {
	const [themeList, setThemeList] = useState([]);

	const selectThemeList = () => {
		let url = localStorage.url + '/main/theme';
		console.log(url);
		axios.get(url).then((res) => setThemeList(res.data));
		console.log(themeList.length);
	};

	useEffect(() => {
		selectThemeList();
	}, []);

	return (
		<Wrapper>
			<Top />
			<ThemeList themeList={themeList} />
			<Bottom />
		</Wrapper>
	);
}

export default Theme;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
