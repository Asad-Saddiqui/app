import axios from "axios";
import { baseurl } from "../../utils/baseUrl";

export const uploadFile = async (formdata) => {
    try {
        const response = await axios.post(`${baseurl}/api/upload`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,  // Include credentials in the request
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