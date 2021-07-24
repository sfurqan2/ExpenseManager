import { takeEvery, put, call } from "redux-saga/effects";
import { EXPENSES } from "../constants";
import { setExpensesError, setExpenses } from "../actions";
import Api from "../api";

function* expenseSaga() {
  yield takeEvery(EXPENSES.LOAD, expensesWorkerSaga);
}

function* expensesWorkerSaga() {
  try {
    const expenses = yield call(Api.fetchGet, Api.expensesApi);
    yield put(
      setExpenses(
        expenses.body.sort((a, b) => {
          return (
            new Date(b.date.replace(" ", "T")) -
            new Date(a.date.replace(" ", "T"))
          );
        }
      )
    ));
  } catch (error) {
    yield put(setExpensesError(error.toString()));
  }
}

export default expenseSaga;
