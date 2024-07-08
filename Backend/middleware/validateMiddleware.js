//* here schema is [signupSchema] or [loginSchema]

// validate function get schema and check the validation  


const validate = (schema) => async (req, resp, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        //console.log(err);  // show array of object of [errors]

        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails
        }
        //console.log(error)
        // resp.status(400).send({ msg: message });
        next(error);  // when this syntax encounter, go to errorMiddleware.js file
    }
}


module.exports = validate;