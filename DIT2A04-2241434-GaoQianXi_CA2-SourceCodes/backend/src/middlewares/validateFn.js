const validator = require('validator');

const validateFn = {
    validateUpdateDesign: function (req, res, next) {
        let fileId = req.body.fileId;
        let designTitle = req.body.designTitle;
        let designDescription = req.body.designDescription;

        let reDesignTitle = new RegExp(`^[a-zA-Z0-9\\s]+$`); // allowing letters, digits and spaces only
        let reDesignDescription = new RegExp(`^[a-zA-Z0-9\\s.]+$`); // allowing letters, digits, spaces and dots only
        let reFileId = new RegExp(`^\\d+$`); // allowing digits only

        if (reDesignTitle.test(designTitle) && reDesignDescription.test(designDescription) && reFileId.test(fileId)) {
            next();
        } else {
            res.status(400).send({ error: "Invalid data received" });
        }
    },

    validateRegister: function (req, res, next) {
        let fullName = req.body.fullName;
        let email = req.body.email;
        let password = req.body.password;

        let reFullName = new RegExp(`^[A-Za-z]+$`); // allowing letters only
        let rePassword = new RegExp(`^[a-zA-Z0-9!@#$%]{8,12}$`); // allowing letters, digits, and the special characters !@#$% with a length between 8 and 12 characters

        if (reFullName.test(fullName) && rePassword.test(password) && validator.isEmail(email)) {
            next();
        } else {
            res.status(400).send({ error: "Invalid data received" });
        }
    },

    validateDesignSearchInput: function (req, res, next) {
        let search = req.params.search;
        let reSearch = new RegExp(`^[a-zA-Z0-9\\s]+$`); // allowing letters, digits and spaces only

        if (reSearch.test(search)) {
            next();
        } else {
            res.status(400).send({ error: "Invalid data received" });
        }
    }
}

module.exports = validateFn;