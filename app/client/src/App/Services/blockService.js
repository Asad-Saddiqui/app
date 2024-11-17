import { baseurl } from "../../utils/baseUrl"

export const addBlock = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/block", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}
export const getBlocks = async (query) => {
    try {
        const queryParam = query && query.query ? `?query=${encodeURIComponent(query.query)}` : '';
        const response = await fetch(baseurl + `/api/block/${queryParam}`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            },
            credentials: "include",
        })
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}
export const getBlockByID = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/block" + id, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            },
            credentials: "include",
        })
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}
// 
export const getBlocksByPhase = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/block/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            },
            credentials: "include",
        })
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}
export const updateBlockByID = async (data) => {
    try {
        const response = await fetch(baseurl + "/api/block/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            credentials: "include",
            body: JSON.stringify(data.updateData)
        })
        const res = await response.json();
        return res;
    } catch (error) {
        return error;
    }
}
export const DeleteBlockByID = async (id) => {
    try {
        const response = await fetch(baseurl + "/api/block" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json"
            },
            credentials: "include",
        })
        const res = await response.json();
        return res.data;
    } catch (error) {
        return error;
    }
}