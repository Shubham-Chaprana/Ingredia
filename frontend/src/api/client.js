import { getAccessToken } from "./tokenService";
import { refreshAccessToken } from "./auth";

const BASE_URL = "http://127.0.0.1:8000/api";


async function baseFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    let data = {};

    try {
        data = await response.json();
    } catch {
        
    }

    return {
        response,
        data,
    };
}


export async function publicFetch(endpoint, options = {}) {
    return baseFetch(endpoint, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });
}


export async function authFetch(endpoint, options = {}) {
    const token = getAccessToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let requestConfig = {
        ...options,
        headers,
    };

    let { response, data } = await baseFetch(endpoint, requestConfig);

    if (response.status === 401) {
        try {
            const newAccessToken = await refreshAccessToken();

            requestConfig = {
                ...requestConfig,
                headers: {
                    ...requestConfig.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                },
            };

            ({ response, data } = await baseFetch(endpoint, requestConfig));
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    }

    return {
        response,
        data,
    };
}