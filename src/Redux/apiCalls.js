import { publicRequest, userRequest } from "../requestMethods/requestMethods";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, updateFailure, updateStart, updateSuccess } from "./userSlice";
import Cookies from "js-cookie";
import { getProductsFailure, getProductsStart, getProductsSucess } from "./productSlice";


export const registerUser = async (dispatch, userPayload) => {
    dispatch(registerStart());
    try {
        const response = await publicRequest.post("/users/register", userPayload)
        const user = response.data.user;
        Cookies.set(`currentUserEmail`, `${user.email}`, {expires: 15 * 60 })
        dispatch(registerSuccess(user))
    }
    catch (err) {
        dispatch(registerFailure(err.response.data));
    }
}


export const loginUser = async (dispatch, user) => {
    dispatch(loginStart);
    try {
        const response = await publicRequest.post("/users/login", user)
        dispatch(loginSuccess(response.data));
    }
    catch (err) {
        dispatch(loginFailure(err.response.data));
    }

}


export const updateUser = async (dispatch, user, id) => {
    dispatch(updateStart);
    try {
        const response = await userRequest.patch(`/users/${id}`, user)
        console.log("Update data: ", response);
        dispatch(updateSuccess(response.data));
    }
    catch (err) {
        console.log(err);
        dispatch(updateFailure(err.response))
    }
}


export const getAllProducts = async (dispatch) => {
    dispatch(getProductsStart)
    try {
        const response = await publicRequest.get("/products");
        console.log("Get all products data: ", response.data);
        dispatch(getProductsSucess(response.data));
    }
    catch (err) {
        console.log(err);
        dispatch(getProductsFailure);
    }
}