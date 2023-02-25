import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isSignedIn: false,
        accessToken: null,
    },
    reducers: {
        requestStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        requestFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.isSignedIn = false;
            state.currentUser = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload.user;
            state.isSignedIn = true;
            state.accessToken = action.payload.accessToken;
        },
        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        logoutUserSuccess: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.accessToken = "";
            state.isSignedIn = false;
        },
        deleteUserSuccess: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.accessToken = "";
            state.isSignedIn = false;
        },
        deleteUserSuccessAdmin: (state) => {
            state.isFetching = false
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    }
})

export const {  requestStart,
                requestFailure,
                registerSuccess, 
                loginSuccess,
                updateSuccess,
                logoutUserSuccess,
                deleteUserSuccessAdmin,
                deleteUserSuccess,
                setAccessToken
            } = userSlice.actions;
                
export default userSlice.reducer;