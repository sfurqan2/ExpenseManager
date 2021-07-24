import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import expensesReducer from './expensesReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    expenses: expensesReducer,
    error: errorReducer,
    user: userReducer,
});

export default rootReducer;
