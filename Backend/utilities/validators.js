const validateName = (name) => {
    if (name === '') {
        return false;
    }
    return true;
};

const validateEmail = (email) => {
    let regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    if (regex.test(email)) {
        return true;
    }
    return false;
};

const validateMobileNo = (mobileNo) => {
    if (mobileNo.length === 10) {
        return true;
    }
    return false;
};

const validateDuration = (duration) => {
    if (duration < 1) {
        return false;
    }
    return true;
};

// const validateDate = (date) => {
//     var dateParts = date.split('/');
//     var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
//     if (dateObject < new Date()) {
//         return true;
//     }
//     return false;
// };
const validateDate = (date) => {
    const inputDate = new Date(date);
    const today = new Date();

    // Strip time part
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate >= today;
};


module.exports = {
    validateName,
    validateEmail,
    validateMobileNo,
    validateDuration,
    validateDate,
};