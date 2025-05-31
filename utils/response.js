function OK(response, statusCode, data, message) {
    response.status(statusCode).json({ isError: false, data, message })
}

function ERR(response, statusCode, data, message) {
    response.status(statusCode).json({ isError: true, data, message })
}

module.exports = { OK, ERR }