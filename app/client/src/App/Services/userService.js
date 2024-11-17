import { baseurl } from "../../utils/baseUrl";

export const addUser = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/auth/add/user", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const res = await response.json();
        if (response.ok) {
            console.log('sdfsd', res)
            return res; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to add user"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};
export const getUser = async () => {
    try {
        const response = await fetch(baseurl + "/api/auth/get/user", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
        });

        const res = await response.json();
        if (response.ok) {
            return res.data; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to add user"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};
export const getUserByID = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/auth/get/user/"+id, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
        });

        const res = await response.json();
        if (response.ok) {
            return res.data; // Successfully added user
        } else {
            throw new Error(res.msg || "Failed to add user"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};
