import { baseurl } from "../../utils/baseUrl";

export const updateUserPermission = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/auth/permission/user/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
            body: JSON.stringify(data.permission),
        });

        const res = await response.json();
        if (response.ok) {
            return res; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to add user"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};


export const getPermissions = async () => {
    try {
        const response = await fetch(baseurl + "/api/auth/permission/", {
            method: "GET",
            credentials: "include",
        });

        const res = await response.json();
        if (response.ok) {
            return res; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to add user"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
}

export const getUserByID = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/auth/get/user/" + id, {
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
