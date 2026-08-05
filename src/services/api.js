import axios from "axios";

import { API } from "@/constants/api";

import { getAccessToken } from "./tokenService";

const api = axios.create({

    baseURL: API.BASE_URL,

    timeout: 10000,

    headers: {

        "Content-Type": "application/json",

    },

});

// Read on every request rather than at module load, so a token saved after
// login is picked up without a reload. Login and register run before one
// exists; a missing token simply leaves the header off.
api.interceptors.request.use((config) => {

    const token = getAccessToken();

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export default api;