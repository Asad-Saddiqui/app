import { baseurl } from "../../utils/baseUrl";

export const addPhase = async (data) => {
    try {
        const response = await fetch(`${baseurl}/api/phase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.errors || "Failed to add phase.");
        }
        return res;
    } catch (error) {
        console.error('Error in addPhase:', error);
        throw error;
    }
};

export const getPhases = async (data) => {
    try {
        // Construct the query string if the query exists
        const queryParam = data && data.query ? `?query=${encodeURIComponent(data.query)}` : '';
        const response = await fetch(`${baseurl}/api/phase${queryParam}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.errors || "Failed to fetch phases.");
        }
        return res.data;
    } catch (error) {
        console.error('Error in getPhases:', error);
        throw error;
    }
};


export const getPhaseByID = async (id) => {
    try {
        const response = await fetch(`${baseurl}/api/phase/${id}`, { method: "GET" });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.errors || "Failed to fetch phase by ID.");
        }
        return res.data;
    } catch (error) {
        console.error('Error in getPhaseByID:', error);
        throw error;
    }
};

export const updatePhaseByID = async (data) => {
    try {
        const response = await fetch(`${baseurl}/api/phase/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data.updateData),
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.errors || "Failed to update phase.");
        }
        console.log('res', res)
        return res;
    } catch (error) {
        console.error('Error in updatePhaseByID:', error);
        throw error;
    }
};

export const deletePhaseByID = async (id) => {
    try {
        const response = await fetch(`${baseurl}/api/phase/${id}`, {
            method: "DELETE", headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const res = await response.json();
        if (!response.ok) {
            throw new Error(res.errors || "Failed to delete phase.");
        }
        return res;
    } catch (error) {
        console.error('Error in deletePhaseByID:', error);
        throw error;
    }
};
