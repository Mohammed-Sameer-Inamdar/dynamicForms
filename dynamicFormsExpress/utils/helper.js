export const Respond = (res, code = 404, message = '', result = null) => {
    if (code != 200) {
        // let error;
        if (code == 400) {
            if (result && result.name == 'CastError' && result.kind == 'ObjectId') {
                message = "You may pass wrong id, Please check request type and url";
            }
        }
    }
    res.statusCode = code;
    res.statusMessage = message;
    // res.statusText = message;
    res.json({ status: code, message: message, data: result });
}