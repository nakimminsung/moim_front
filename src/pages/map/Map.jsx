import React from 'react';
import {List, Menu, Content} from './index';
import styled from '@emotion/styled/macro';
import {Box, Typography} from '@mui/material';

function Map(props) {
	return (
		<MapWrapper>
			<h1>지도페이지</h1>
			<List />
			<Menu />
			<Content />
		</MapWrapper>
	);
}

export default Map;

const MapWrapper = styled(Box)``;
