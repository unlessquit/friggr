var validator = require('validator')

exports.userId = value => value && validator.isAlphanumeric(value)
