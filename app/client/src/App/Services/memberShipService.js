import { baseurl } from "../../utils/baseUrl";

export const addMemberShip = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/membership", {
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
            throw new Error(res?.errors[0]?.msg || "Failed to add member ship"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
};

export const getMemberShip = async () => {
    try {
        const response = await fetch(baseurl + "/api/membership", {
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
export const getMemberShipById = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/membership/" + id, {
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
}


export const importMembership = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/import/memberships", {
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
            throw new Error(res?.errors[0]?.msg || "Failed to add member ship"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
}


//
export const updateMembership = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/membership/update/" + data.id, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            credentials: "include",
            body: JSON.stringify(data.data),
        });




        const res = await response.json();
        if (response.ok) {
            return res; // Successfully added user
        } else {
            throw new Error(res?.errors[0]?.msg || "Failed to Update member ship"); // Throw an error for the rejected case
        }
    } catch (error) {
        throw error; // Throw the error to be caught by the thunk
    }
}
// owner