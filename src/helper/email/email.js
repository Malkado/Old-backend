module.exports = {
    setCodeInEmail(code, name) {
        // const document = document
        document.getElementById('username').innerText = 'Olá, ' + name + '.';
        document.getElementById('code').innerText = code;
console.log(document);
        return document;

    }
}