import { baseurl } from "../../utils/baseUrl";

export const addOwner = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/owner", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
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

export const getOwners = async () => {
    try {
        const response = await fetch(baseurl + "/api/owner", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
            },
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
};
export const updateOwners = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/owner/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
            body: JSON.stringify(data?.data)
        });

        const res = await response.json();
        if (response.ok) {
            return res; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to update user"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};