import React, { useState } from 'react';

const ExpenseContext = React.createContext();

const Expenses = (props) => {
    const [expenseData, setExpenseData] = useState([
        {daily: 500},
        {monthly: 2500},
        {yearly: 15000},
    ]);

    return(
        <ExpenseContext.Provider value={expenseData, setExpenseData}>
            {props.children}
        </ExpenseContext.Provider>
    );
}

export {ExpenseContext, Expenses}