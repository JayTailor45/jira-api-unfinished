module.exports.validateRegisterInput = (
    email,
    password,
) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = 'Email field is required';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be valid email address';
        }
    }
    if (password.trim() === '') {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};


module.exports.validateLoginInput = (
    email,
    password,
) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = 'Email field is required';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be valid email address';
        }
    }
    if (password.trim() === '') {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
};