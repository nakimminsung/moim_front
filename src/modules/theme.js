/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_THEMEDATA = 'theme/SET_THEMEDATA';
const SET_ROOMDATA = 'theme/SET_ROOMDATA';
const SET_SORT = 'theme/SET_SORT';
const SET_ROOMNAME = 'theme/SET_ROOMNAME';
const SET_HEADCOUNT = 'theme/SET_HEADCOUNT';
const SET_ADDRESS = 'theme/SET_ADDRESS';
const SET_PAYMENT = 'theme/SET_PAYMENT';
const SET_SPRICE = 'theme/SET_SPRICE';
const SET_EPRICE = 'theme/SET_EPRICE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setThemeData = (themeData) => ({type: SET_THEMEDATA, themeData});
export const setRoomData = (roomData) => ({type: SET_ROOMDATA, roomData});
export const setSort = (sort) => ({type: SET_SORT, sort});
export const setRoomName = (roomName) => ({type: SET_ROOMNAME, roomName});
export const setHeadCount = (headCount) => ({type: SET_HEADCOUNT, headCount});
export const setAddress = (address) => ({type: SET_ADDRESS, address});
export const setPayment = (payment) => ({type: SET_PAYMENT, payment});
export const setSprice = (sprice) => ({type: SET_SPRICE, sprice});
export const setEprice = (eprice) => ({type: SET_EPRICE, eprice});

/* 초기 상태 선언 */
const initialState = {
	sort: 'readCount desc',
	roomName: '',
	headCount: '',
	address: '',
	payment: '',
	sprice: 0,
	eprice: 500000,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action) {
	switch (action.type) {
		case SET_THEMEDATA:
			return {
				...state,
				themeData: action.themeData,
			};
		case SET_ROOMDATA:
			return {
				...state,
				roomData: action.roomData,
			};
		case SET_SORT:
			return {
				...state,
				sort: action.sort,
			};
		case SET_ROOMNAME:
			return {
				...state,
				roomName: state.roomName,
			};
		case SET_HEADCOUNT:
			return {
				...state,
				headCount: state.headCount,
			};
		case SET_ADDRESS:
			return {
				...state,
				address: state.address,
			};
		case SET_PAYMENT:
			return {
				...state,
				payment: state.payment,
			};
		case SET_SPRICE:
			return {
				...state,
				sprice: state.sprice,
			};
		case SET_EPRICE:
			return {
				...state,
				eprice: state.eprice,
			};
		default:
			return state;
	}
}
