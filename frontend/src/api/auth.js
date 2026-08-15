import { getRefreshToken, setTokens } from "./tokenService";
import { publicFetch } from "./client";

export async function refreshAccessToken() {
    const refresh = getRefreshToken();

    const response = await fetch(
        "http://127.0.0.1:8000/api/auth/refresh/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Refresh failed");
    }

    setTokens(data.access, refresh);

    return data.access;
}

export async function loginUser(username, password) {
    const { response, data } = await publicFetch("/auth/login/", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!response.ok) {
        const error =  new Error(data.detail || "Login failed");
        error.status = response.status;
        throw error;
    }

    return data;
}

export async function registerUser(username, email, password) {
    const { response, data } = await publicFetch("/auth/register/", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    if (!response.ok) {
        const firstError = Object.values(data).flat()[0];

        const error = new Error(firstError || "Registration failed");
        error.status = response.status;

        throw error;
    }

    return data;
}