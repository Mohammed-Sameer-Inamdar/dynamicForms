export const APP_PORT = 3000;
export const ROUTE_NAMES = {
    BASE: "/v1",

    FORM: {
        LIST: '/',
        CREATE: '/form/create',
        UPDATE: '/form/:id',
        VIEW: '/form/:id',
        DELETE: '/form/:id'
    },

    RESPONSE: {
        CREATE: '/response/create'
    }
};

export const RESPONSE = {

    SUCCESS: {
        CODE: 200,
        LIST: "Searching success",
        SAVE: "Saved successfully",
        DELETE: "Deleted successfully",
    },
    FAILED: {
        CODE: 401,
        SAVE: "Failed to save",
        DELETE: "Deleting failed",
    },
    ERROR: {
        CODE: 500,
        MESSAGE: "Internal server error"
    },
    MISSING: {
        CODE: 400,
        MESSAGE: "Body is missing."
    },
    NOT_FOUND: {
        CODE: 404,
        ROUTE: "Route not found",
        DATA: "Data not found"
    }

}