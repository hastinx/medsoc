const r_auth = require('./authUser.js')
const r_user = require('./user.js')
const r_content = require('./content.js')

module.exports = {
    routes: [
        r_auth,
        r_user,
        r_content
    ]
}