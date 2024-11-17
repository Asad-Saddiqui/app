// 

import { baseurl } from "../../utils/baseUrl";


export const transfer_membership = async (data) => {
    try {
        const response = await fetch(`${baseurl}/api/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};

// 


export const UpdateMembershiptransferService = async (data) => {
    try {
        const response = await fetch(`${baseurl}/api/transfer/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};
// 
export const track_transfer_membership = async (data) => {
    try {
        const response = await fetch(`${baseurl}/api/track/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.message || "Failed to add phase.");
        }
        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};

export const track_transfer_membership_Complation = async (data) => {
    try {
        const response = await fetch(`${baseurl}/api/track/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.message || "Failed to add phase.");
        }
        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};
// 

export const fetchTransferFile = async () => {
    try {
        const response = await fetch(`${baseurl}/api/track/transfer/admin`, {
            method: "POST",

            credentials: "include",
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.message || "Failed to add phase.");
        }

        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};


// /api/transfer/application-form/


export const application_form = async ({ id, fileId }) => {
    try {
        const response = await fetch(`${baseurl}/api/transfer/application-form/` + id + "/" + fileId, {
            method: "GET",
            credentials: "include",
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.message || "Failed to add phase.");
        }

        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};