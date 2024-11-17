import { baseurl } from "../../utils/baseUrl";

const BASE_URL = baseurl + '/api'; // Base URL for your API

// Service to create a charge type
export const createChargeTypeService = async (chargeName) => {
    const response = await fetch(`${BASE_URL}/create/chargeType`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(chargeName),
    });

    if (!response.ok) {
        throw new Error('Failed to create charge type');
    }

    return await response.json();
};

// Service to get all charge types
export const getChargeTypesService = async () => {
    const response = await fetch(`${BASE_URL}/get/chargeType`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",

    });

    if (!response.ok) {
        throw new Error('Failed to fetch charge types');
    }

    return await response.json();
};
