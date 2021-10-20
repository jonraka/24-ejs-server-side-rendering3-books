const {
    sendUserError,
    sendNotAuthorized
} = require("./misc");
// const jwt = require("jsonwebtoken");

// const validateJwt = async (req, res, next) => {
//     const token = req.get("authorization")?.split(" ")?.[1];
//     if(!token) return sendNotAuthorized(res, "Not authorized");

//     jwt.verify(token, process.env.JWT_SECRET, (err, jwtData) => {
//         if(err || !jwtData.id) return sendNotAuthorized(res, "Invalid token");
//         req.jwtData = jwtData;
//         next();
//     });
// }

const expressErrorHandle =  (errorMessage = "error") => (err, req, res, next) => {
    if(err) return sendUserError(res, errorMessage);
    next();
};

const expressErrorHandleEjs =  (error = "error") => (err, req, res, next) => {
    if(err) return res.send(500).render("pages/error", {error})
    next();
};

module.exports = {
    // validateJwt,
    expressErrorHandle,
    expressErrorHandleEjs
}