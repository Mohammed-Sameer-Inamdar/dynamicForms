import { postDataFromService } from ".";
import { RESPONSE_URLS } from "./config";

export const saveResponse = (data, callback) => {
    postDataFromService({ url: RESPONSE_URLS.SAVE, data: data })
        .then(response => {
            callback(response);
        }).catch(error => {
            callback(error);
        })
}