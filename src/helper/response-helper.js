module.exports = {

    responseMensage(data = [], message, status) {
        const response = {
            message: message,
            status: status,
            data: data
        }
        return response;
    }
}