import * as SecureStore from 'expo-secure-store';

const ip = "192.168.10.11:8000";
const host = "http://" + ip + "/api/";

const loginApi = host + "login";
const signupApi = host + "signup";
const expensesApi = host + "expenses";
const logoutApi = host + "logout";
const profileApi = host + "profile";
const newExpenseApi = host + "add-expense";
const budgetApi = host + "budget";
const newBudgetApi = host + "new-budget";
const changePasswordApi = host + "change-password";

const fetchGet = async (url) => {
    let token = "";
    const res = SecureStore.getItemAsync('userToken').then(tok => {
        token = tok;
        const response = fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        return response;
    });

    return res.then((response) => response.json());
}

const fetchPost = async (url, body) => {
    let token = "";
    const res = SecureStore.getItemAsync('userToken').then(tok => {
        token = tok;
        const res = fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(body),
        });
        return res;
    });

    return res.then(response => response.json());
}

export default { loginApi, signupApi, expensesApi, logoutApi, profileApi, newExpenseApi, budgetApi, newBudgetApi, changePasswordApi, fetchGet, fetchPost };
