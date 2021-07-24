import { takeEvery, put, call } from 'redux-saga/effects';
import { USER } from '../constants';
import { setUserError, setUser } from '../actions';
import Api from '../api';

function* userSaga(){
    yield takeEvery(USER.LOAD, userWorkerSaga);
}

function* userWorkerSaga(){
    try{
        const user = yield call(Api.fetchGet, Api.profileApi);
        yield put(setUser(user.body));
    }
    catch(error){
        yield put(setUserError(error.toString()));
    };
}

export default userSaga;