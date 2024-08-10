import { deleteDataFromService, getDataFromService, postDataFromService } from "."
import { FORM_URLS } from "./config";

export const fetchFormsList = (callback) => {
    getDataFromService({ url: FORM_URLS.LIST }).then(response => {
        callback(response);
    }).catch(error => {
        callback(error);
    })
}

export const updateForm = (id, data, callback) => {
    postDataFromService({ url: `${FORM_URLS.BY_ID}${id}`, data: data })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}

export const createForm = (data, callback) => {
    postDataFromService({ url: FORM_URLS.CREATE, data: data })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}

export const formDetails = (id, callback) => {
    getDataFromService({ url: `${FORM_URLS.BY_ID}${id}` })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}

export const deleteFrom = (id, callback) => {
    deleteDataFromService({ url: FORM_URLS.BY_ID + id })
        .then(response => {
            callback(response)
        }).catch(error => {
            callback(error)
        })
}