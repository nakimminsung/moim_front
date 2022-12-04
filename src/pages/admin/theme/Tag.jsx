import axios from 'axios';
import React, {useEffect, useState} from 'react';

function Tag(props) {
	const {num} = props;
	const [tagData, setTagData] = useState([]);
	const selectTagList = (num) => {
		let url = localStorage.url + '/tag/list?num=' + num;
		axios.get(url).then((res) => {
			setTagData(res.data.tagData);
		});
	};
	useEffect(() => {
		selectTagList(num);
	}, []);
	return (
		<>
			{tagData &&
				tagData.map((item, i) => <span key={i}>#{item.tname} </span>)}
		</>
	);
}

export default Tag;
