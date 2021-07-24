import { USER } from '../constants';

const userReducer = (state = null, action) => {
    if(action.type === USER.LOAD_SUCCESS){
        return action.user;
    }
    return state;
}

export default userReducer;