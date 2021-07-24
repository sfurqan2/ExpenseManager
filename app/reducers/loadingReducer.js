import { EXPENSES, USER } from "../constants";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case EXPENSES.LOAD:
      return true;

    case USER.LOAD:
      return true;

    case USER.LOAD_FAIL:
      return false;

    case USER.LOAD_SUCCESS:
      return false;

    case EXPENSES.LOAD_SUCCESS:
      return false;

    case EXPENSES.LOAD_FAIL:
      return false;
      
    default:
      return state;
  }
};

export default loadingReducer;
