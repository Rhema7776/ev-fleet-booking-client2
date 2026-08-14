import api from "../api";

import { API } from "@/constants/api";

import { STORAGE_KEYS } from "@/constants/storage";

import {
    saveTokens,
    clearTokens,
} from "../tokenService";

export const login = async (credentials) => {
    
    console.log("LOGIN SERVICE START");
    console.log(credentials);


    try {

        const response = await api.post(
            API.ENDPOINTS.LOGIN,
            credentials
        );
        console.log("LOGIN RESPONSE:", response.data);
        const {
            accessToken,
            refreshToken,
            user,
        } = response.data;

        saveTokens({
            accessToken,
            refreshToken,
        });

        localStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify(user)
        );

        return user;

    } catch (error) {

        console.log("STATUS:", error.response?.status);
        console.log("BACKEND RESPONSE:", error.response?.data);

        throw error;

    }

};
export const registerUser = async (data) => {

    const response = await api.post(
        API.ENDPOINTS.REGISTER,
        data
    );
    
console.log("Register request received:", data.email);
    return response.data;

};



export const verifyOTP = async (data) => {
    console.log("AUTH SERVICE START");

    const response = await api.post(
        API.ENDPOINTS.VERIFY_OTP,
        data
    );

    console.log("AUTH SERVICE END");

    return response.data;
};
export const createPassword = async (data) => {

    const response = await api.post(

        API.ENDPOINTS.CREATE_PASSWORD,

        data

    );

    return response.data;

};

export const logout = () => {

    clearTokens();

    localStorage.removeItem(
        STORAGE_KEYS.USER
    );

};

export const getCurrentUser = () => {

    const user = localStorage.getItem(
        STORAGE_KEYS.USER
    );

    return user
        ? JSON.parse(user)
        : null;

};

export const forgotPassword = async (data) => {

    const response = await api.post(

        API.ENDPOINTS.FORGOT_PASSWORD,

        data

    );

    return response.data;

};

export const resetPassword = async (data) => {

    const response = await api.post(

        API.ENDPOINTS.RESET_PASSWORD,

        data

    );

    return response.data;

};

export const socialLogin = async (data) => {

    const response = await api.post(
        API.ENDPOINTS.SOCIAL_LOGIN,
        data
    );

    const {
        accessToken,
        refreshToken,
        user,
        isNewUser, // ← NEW
    } = response.data;

    saveTokens({
        accessToken,
        refreshToken,
    });

    localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(user)
    );

    return { user, isNewUser }; 
};
// export const socialLogin = async (data) => {

//     const response = await api.post(
//         API.ENDPOINTS.SOCIAL_LOGIN,
//         data
//     );

//     const {
//         accessToken,
//         refreshToken,
//         user,
//     } = response.data;

//     saveTokens({
//         accessToken,
//         refreshToken,
//     });

//     localStorage.setItem(
//         STORAGE_KEYS.USER,
//         JSON.stringify(user)
//     );

//     return user;
// };