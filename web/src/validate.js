var validator = require('validator')

exports.userId = value => value && validator.isAlphanumeric(value)

exports.resizedPhotoWidth = value => value && validator.isInt(value)
exports.resizedPhotoHeight = value => value && validator.isInt(value)
