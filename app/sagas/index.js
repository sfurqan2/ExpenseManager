import expenseSaga from "./expenseSaga";
import userSaga from "./userSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([expenseSaga(), userSaga()]);
}
