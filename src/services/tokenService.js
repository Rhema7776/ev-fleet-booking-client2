import { STORAGE_KEYS } from "@/constants/storage";

export const saveTokens = ({
    accessToken,
    refreshToken,
}) => {

    localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        accessToken
    );

    localStorage.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        refreshToken
    );

};

export const getAccessToken = () => {

    return localStorage.getItem(
        STORAGE_KEYS.ACCESS_TOKEN
    );

};

export const getRefreshToken = () => {

    return localStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
    );

};

export const clearTokens = () => {

    localStorage.removeItem(
        STORAGE_KEYS.ACCESS_TOKEN
    );

    localStorage.removeItem(
        STORAGE_KEYS.REFRESH_TOKEN
    );

};