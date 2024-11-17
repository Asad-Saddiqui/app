// src/Services/chargesService.js

import { baseurl } from "../../utils/baseUrl";

export const addCharges = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/create/charges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (response.ok) {
            return res.data; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to add user");
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};

export const getCharges = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/charges/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const res = await response.json();
        if (response.ok) {
            return res.data; // Successfully fetched charges
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to fetch charges");
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};

// New function to handle payment
export const receivePayment = async (paymentData) => {
    try {
        const response = await fetch(baseurl + "/api/receive/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(paymentData),
        });
        const res = await response.json();
        if (response.ok) {
            return res.data; // Successfully processed payment
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to process payment");
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};
