import {combineReducers} from 'redux';
import counter from './counter';
import todos from './todos';
import theme from './theme';

const rootReducer = combineReducers({
	counter,
	theme,
	todos,
});

export default rootReducer;
