import { EXPENSES, USER } from '../constants';

const errorReducer = (state = false, action) => {
    switch(action.type){
        case EXPENSES.LOAD:
        case EXPENSES.LOAD_SUCCESS:
            return null;
        case EXPENSES.LOAD_FAIL:
            return action.error;
        case USER.LOAD_FAIL:
            return action.error;
        default:
            return state; 
    }
}

export default errorReducer;