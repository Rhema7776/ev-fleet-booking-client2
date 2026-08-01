import api from "../api";

import { API } from "@/constants/api";

import { STORAGE_KEYS } from "@/constants/storage";

import {
    saveTokens,
    clearTokens,
} from "../tokenService";

export const login = async (credentials) => {

    const response = await api.post(
        API.ENDPOINTS.LOGIN,
        credentials
    );

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

};

export const registerUser = async (data) => {

    const response = await api.post(
        API.ENDPOINTS.REGISTER,
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