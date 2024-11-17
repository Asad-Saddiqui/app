// Function to check access
export const checkAccess = (Cookies, resource, accessType) => {
    const permission = Cookies.get('permission') ? JSON.parse(Cookies.get('permission')) : null;
    const resourcePermission = permission?.find((perm) => perm.resource === resource);
    return resourcePermission ? resourcePermission.access[accessType] || false : false;
}

export const toTitleCase = (input) => {
    if (!input) return ''; // Return an empty string if input is empty

    return input
        .split(' ') // Split the input into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
};
