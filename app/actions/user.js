import { USER } from '../constants';

const loadUser = () => ({
    type: USER.LOAD,
});

const setUser = (user) => ({
    type: USER.LOAD_SUCCESS,
    user,
});

const setUserError = (error) => ({
    type: USER.LOAD_FAIL,
    error
});

export { loadUser, setUser, setUserError };