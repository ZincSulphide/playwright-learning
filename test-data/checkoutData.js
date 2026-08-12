export const checkoutData = {
    valid: {
        firstName: "John",
        lastName: "Doe",
        postalCode: "1247"
    },

    validationCases: [
        {
            firstName: "",
            lastName: "Doe",
            postalCode: "1247",
            error: "Error: First Name is required"
        },
        {
            firstName: "John",
            lastName: "",
            postalCode: "1247",
            error: "Error: Last Name is required"
        },
        {
            firstName: "John",
            lastName: "Doe",
            postalCode: "",
            error: "Error: Postal Code is required"
        }
    ]
};