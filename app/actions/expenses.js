import { EXPENSES } from '../constants';

const loadExpenses = () => ({
    type: EXPENSES.LOAD,
});

const setExpenses = (expenses) => ({
    type: EXPENSES.LOAD_SUCCESS,
    expenses,
});

const setExpensesError = (error) => ({
    type: EXPENSES.LOAD_FAIL,
    error
});

export { loadExpenses, setExpenses, setExpensesError };