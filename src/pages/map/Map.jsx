import React from 'react';
import {List, Menu, Content} from './index';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';

function Map(props) {
	return (
		<MapWrapper>
			<List />
			<Menu />
			<Content />
		</MapWrapper>
	);
}

export default Map;

const MapWrapper = styled(Box)``;
