export const confirmPassword = (password, email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let notif = {
        message: ""
    }
    if (password.length < 8)
        notif.message += "Passwords should contain at least 8 characters"
    if (!regex.test(email)) {
        notif.message += "Email format is not valid"
    }

    return notif
}