const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
exports.generateToken = () => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 25; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
