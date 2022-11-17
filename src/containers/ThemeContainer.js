import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
	setThemeData,
	setRoomData,
	setSort,
	setRoomName,
	setHeadCount,
	setAddress,
	setPayment,
	setSprice,
	setEprice,
} from '../modules/theme';
import Map from '../pages/thememap/Map';

function ThemeContainer() {
	// useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
	// state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
	const {
		themeData,
		roomData,
		sort,
		roomName,
		headCount,
		address,
		payment,
		sprice,
		eprice,
	} = useSelector((state) => ({
		themeData: state.theme.themeData,
		roomData: state.theme.roomData,
		sort: state.theme.sort,
		roomName: state.theme.roomName,
		headCount: state.theme.headCount,
		address: state.theme.address,
		payment: state.theme.payment,
		sprice: state.theme.sprice,
		eprice: state.theme.eprice,
	}));

	// useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
	const dispatch = useDispatch();
	// 각 액션들을 디스패치하는 함수들을 만드세요
	const onThemeData = (themeData) => dispatch(setThemeData(themeData));
	const onRoomData = (roomData) => dispatch(setRoomData(roomData));
	const onSort = (sort) => dispatch(setSort(sort));
	const onRoomName = (roomName) => dispatch(setRoomName(roomName));
	const onHeadCount = (headCount) => dispatch(setHeadCount(headCount));
	const onAddress = (address) => dispatch(setAddress(address));
	const onPayment = (payment) => dispatch(setPayment(payment));
	const onSprice = (sprice) => dispatch(setSprice(sprice));
	const onEprice = (eprice) => dispatch(setEprice(eprice));

	return (
		<Map
			// 상태와
			themeData={themeData}
			roomData={roomData}
			sort={sort}
			roomName={roomName}
			headCount={headCount}
			address={address}
			payment={payment}
			sprice={sprice}
			eprice={eprice}
			// 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
			onThemeData={onThemeData}
			onRoomData={onRoomData}
			onSort={onSort}
			onRoomName={onRoomName}
			onHeadCount={onHeadCount}
			onAddress={onAddress}
			onPayment={onPayment}
			onSprice={onSprice}
			onEprice={onEprice}
		/>
	);
}

export default ThemeContainer;
