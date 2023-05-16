const db = require('../config/db.js');
const dbPromise = db.promise()

module.exports = {
    comment: async (req, res) => {
        const { comment, id_content, email } = req.body
        try {
            await dbPromise.query(`INSERT INTO tb_comment (id_content,comment,email) VALUES ('${id_content}','${comment}','${email}')`)

            res.status(200).json({ 'status': true })
        } catch (error) {
            res.status(400).json({ 'status': false })
        }

    },
    like: async (req, res) => {
        const { id_content, email } = req.body

        try {
            await dbPromise.query(`INSERT INTO tb_like (id_content,like_status,email) VALUES ('${id_content}',1,'${email}')`)

            res.status(200).json({ 'status': true })
        } catch (error) {
            res.status(400).json({ 'status': false })
        }
    },
    unlike: async (req, res) => {

        try {
            await dbPromise.query(`UPDATE tb_like SET like_status=0 WHERE id=${req.query.id}`)

            res.status(200).json({ 'status': true })
        } catch (error) {
            res.status(400).json({ 'status': false })
        }
    }
}