import { EXPENSES } from '../constants';

const expensesReducer = (state = [], action) => {
    if(action.type === EXPENSES.LOAD_SUCCESS){
        return [ ...action.expenses ];
    }
    return state;
}

export default expensesReducer;