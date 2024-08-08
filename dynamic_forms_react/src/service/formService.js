import { deleteDataFromService, getDataFromService, postDataFromService } from "."
import { FORM_URLS } from "./config";

export const fetchFormsList = (callback) => {
    getDataFromService({ url: 'http://localhost:3000' }).then(response => {
        callback(response);
    }).catch(error => {
        callback(error);
    })
}

export const updateForm = (id, data, callback) => {
    postDataFromService({ url: `http://localhost:3000/form/${id}`, data: data })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}

export const createForm = (data, callback) => {
    postDataFromService({ url: 'http://localhost:3000/form/create', data: data })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}

export const formDetails = (id, callback) => {
    getDataFromService({ url: `http://localhost:3000/form/${id}` })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}

export const deleteFrom = (id, callback) => {
    deleteDataFromService({ url: FORM_URLS.DELETE + id })
        .then(response => {
            callback(response)
        }).catch(error => {
            callback(error)
        })
}