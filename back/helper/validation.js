exports.passwordValidation = (password) => {
    console.log('password', password)
    let notif = []
    if (password && password.length < 8) {
        notif.push('Password must at least 8 characters')
    }

    if (!password.match(/\d/g)) {
        notif.push('Password should contain number')
    }

    if (!password.match(/[A-Z]/g)) {
        notif.push('Password should contain uppercase letter')
    }

    if (!password.match(/[a-z]/g)) {
        notif.push('Password should contain lowercase letter')
    }

    if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        notif.push('Password should contain Symbol')
    }
    console.log(notif)
    if (notif.length > 0) {
        return {
            status: false,
            message: notif
        }
    } else {
        return true
    }

}

exports.emailValidation = (email) => {
    let notif = []

    if (!email.match(/[@]/)) {
        notif.push("Email format isn't correct")
    }

    if (notif.length > 0) {
        return {
            status: false,
            message: notif
        }
    } else {
        return true
    }
}