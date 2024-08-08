import { RESPONSE } from '../utils/constants.js';
import { Respond } from '../utils/helper.js';
import FormResponse from './response.model.js'


const validateResponse = (data) => {
    if (!data) {
        return RESPONSE.MISSING
    }
    let message = '';
    let missingFieldCount = 0;

    if (!data.formTitle) {
        message = 'form title';
        missingFieldCount++;
    }
    if (!data.formId) {
        if (missingFieldCount > 0) {
            message += ' and ';
        }
        message += "form id";
    }

    if (!data.fields || data.fields.length <= 0) {
        if (missingFieldCount > 0) {
            message += ' and ';
        }
        message += 'fields';
    }
    if (missingFieldCount > 1) {
        return { ...RESPONSE.MISSING, MESSAGE: message + ' are required' };
    } else if (missingFieldCount > 0) {
        return { ...RESPONSE.MISSING, MESSAGE: message + ' is required' };
    }
    return null
}

export const responseCreate = (req, res) => {

    let body = req.body;
    if (body && typeof body == 'string') {
        body = JSON.parse(body);
    }
    const isValid = validateResponse(body);
    if (isValid) {
        return Respond(res, isValid.CODE, isValid.MESSAGE);
    }

    const newResponseData = new FormResponse({
        responseFormId: body._id,
        responseFormTitle: body.formTitle,
        responseFields: body.fields
    })

    newResponseData.save()
        .then(data => {
            return Respond(res, RESPONSE.SUCCESS.CODE, RESPONSE.SUCCESS.SAVE);
        }).catch(error => {
            //log into file for tracking
            console.error(error);
            return Respond(res, RESPONSE.FAILED.CODE, RESPONSE.FAILED.SAVE);
        })

}