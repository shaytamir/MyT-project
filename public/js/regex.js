const emailRegex = /^(?=[a-z0-9.]{3,20}$)[a-z0-9]+\.?[a-z0-9]+$|^.*@\w+\.[\w.]+$/i;

const regex = [emailRegex];

module.exports = regex;
