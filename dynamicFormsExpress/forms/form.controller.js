import { Types } from "mongoose";
import Field from "../fields/fields.model.js";
import { RESPONSE } from "../utils/constants.js";
import { Respond } from "../utils/helper.js";
import Form from "./form.model.js"

export const listForm = (req, res) => {
    const page = req.query.page;
    const limit = 10;
    let offset = 0;
    if (page) {
        offset = (page - 1) * limit;
    }

    Form.aggregate([
        { $sort: { formCreatedAt: -1 } },
        {
            $lookup: {
                from: "fields",
                localField: "_id",
                foreignField: "fieldFormId",
                as: "fieldsDoc",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            fieldId: 1,
                            fieldName: 1,
                            fieldType: 1,
                            fieldLabel: 1,
                            fieldPlaceholder: 1,
                            fieldPosition: 1,
                        }
                    },
                ]
            }
        },
        { skip: offset },
        { limit: limit },
        {
            $project: {
                _id: 1,
                formTitle: 1,
                fields: "$fieldsDoc"
            }
        }
    ]).then(data => {
        return Respond(res, RESPONSE.SUCCESS.CODE, RESPONSE.SUCCESS.LIST, data);
    }).catch(err => {
        //log into file for tracking
        console.error(err)
        return Respond(res, RESPONSE.ERROR.CODE, RESPONSE.ERROR.MESSAGE);
    });
}

const validateFormData = (data) => {
    if (!data) {
        return RESPONSE.MISSING;
    }
    let message = '';
    let missingFieldCount = 0;
    if (!data.formTitle) {
        message = "form title";
        missingFieldCount++;
    }

    if (!data.fields) {
        if (missingFieldCount > 0) {
            message += ' and ';
        }
        message += "form fields";
        missingFieldCount++;
    }

    if (missingFieldCount > 1) {
        return { ...RESPONSE.MISSING, MESSAGE: message += " are required." }
    } else if (missingFieldCount > 0) {
        return { ...RESPONSE.MISSING, MESSAGE: message += " is required." }
    }
    return null;
}

export const createForm = (req, res) => {

    let body = req.body;
    if (body && typeof body == "string") {
        body = JSON.parse(body);
    }

    const isValid = validateFormData(body);
    if (isValid) {
        return Respond(res, isValid.CODE, isValid.MESSAGE);
    }
    const formData = new Form({ formTitle: body.formTitle });
    formData.save()
        .then(async (data) => {
            if (data && data._id) {

                let fields = body.fields;
                fields = fields.map(field => ({ ...field, "fieldFormId": data._id }))
                await Field.insertMany(fields);
                return Respond(res, RESPONSE.SUCCESS.CODE, RESPONSE.SUCCESS.SAVE, { id: data._id });

            } else {
                //log into file for tracking
                return Respond(res, RESPONSE.FAILED.CODE, RESPONSE.FAILED.SAVE);
            }
        }).catch(error => {
            //log into file for tracking
            console.error(error)
            return Respond(res, RESPONSE.ERROR.CODE, RESPONSE.ERROR.MESSAGE);

        })
}

export const formDetails = (req, res) => {

    const id = req.params.id;

    Form.aggregate([
        { $match: { _id: Types.ObjectId.createFromHexString(id) } },
        { $sort: { formCreatedAt: -1 } },
        {
            $lookup: {
                from: "fields",
                localField: "_id",
                foreignField: "fieldFormId",
                as: "fieldsDoc",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            fieldId: 1,
                            fieldName: 1,
                            fieldType: 1,
                            fieldLabel: 1,
                            fieldPlaceholder: 1,
                            fieldPosition: 1,
                        }
                    },
                ]
            }
        },
        {
            $project: {
                _id: 1,
                formTitle: 1,
                fields: "$fieldsDoc"
            }
        }
    ]).then(data => {
        let result = {}
        if (data && data.length > 0) {
            result = data[0];
        }
        return Respond(res, RESPONSE.SUCCESS.CODE, RESPONSE.SUCCESS.LIST, result);
    }).catch(err => {
        //log into file for tracking
        console.error(err)
        return Respond(res, RESPONSE.ERROR.CODE, RESPONSE.ERROR.MESSAGE);
    });
}

export const updateForm = async (req, res) => {
    try {
        let body = req.body;
        if (body && typeof body == 'string') {
            body = JSON.parse(body);
        }
        const isValid = validateFormData(body);
        if (isValid) {
            return Respond(res, isValid.CODE, isValid.MESSAGE);
        }

        const id = req.params.id;
        const updateFormData = { formTitle: body.formTitle };
        const newFromData = await Form.findByIdAndUpdate(id, updateFormData, { new: true });
        await Field.deleteMany({ fieldFormId: newFromData._id });

        let fields = body.fields;
        fields = fields.map(field => ({ ...field, "fieldFormId": newFromData._id, _id: null }));
        await Field.insertMany(fields);

        return Respond(res, RESPONSE.SUCCESS.CODE, RESPONSE.SUCCESS.SAVE);
    } catch (error) {
        //log into file for tracking
        console.error(error);
    }

}

export const deletForm = (req, res) => {
    const id = req.params.id;

    Form.deleteOne({ _id: Types.ObjectId.createFromHexString(id) })
        .then(async (data) => {
            await Field.deleteMany({ fieldFormId: Types.ObjectId.createFromHexString(id) });
            return Respond(res, RESPONSE.SUCCESS.CODE, RESPONSE.SUCCESS.DELETE);
        }).catch(error => {
            //log into file for tracking
            console.error(error);
            return Respond(res, RESPONSE.ERROR.CODE, RESPONSE.ERROR.MESSAGE);
        })
} 