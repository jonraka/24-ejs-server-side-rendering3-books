const sendSuccess = (res, data) => res.status(200).send({
    success: true,
    data
});

const sendServerError = (res, data) => res.status(500).send({
    success: false,
    error: data
});

const sendUserError = (res, data) => res.status(400).send({
    success: false,
    error: data
});

const sendNotAuthorized = (res, data) => res.status(401).send({
    success: false,
    error: data
});

const sendNotFound = (res) => res.status(401).send({
    success: false,
    error: "Page not found"
});

// /**
//  * @param {{}} joiSchema joi object schema
//  * @param {{}} body request body
//  * @returns {Promise<[data: {} | null, error: string | null]>} [Validated Data, Error String]
//  */
// const joiValidator = async (joiSchema, body) => {
//     if(!joiSchema || !body) return Promise.resolve([null, "Fields Missing"]);
//     return joiSchema
//         .validateAsync(body)
//         .then(res => [res, null])
//         .catch(err => [null, err.message.replace(/\"/g, "")]);
// }

module.exports = {
    sendSuccess,
    sendServerError,
    sendUserError,
    // joiValidator,
    sendNotAuthorized,
    sendNotFound
}