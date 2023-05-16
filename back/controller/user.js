const db = require('../config/db.js');
const dbPromise = db.promise()
const multer = require('multer')
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/profiles");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(
                new Error("Invalid file type. Only PNG, JPG, and JPEG allowed.")
            );
        }
    },
}).single("image");

module.exports = {
    update: async (req, res) => {
        console.log(req.file)
        upload(req, res, async (err) => {
            console.log(req.file)
            const { username, fullname, bio } = req.body
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: "Error uploading image",
                });
            }
            if (req.file !== undefined) {
                let imageUrl = req.protocol + '://' + req.get('host') + "/profiles/" + req.file.filename

                await dbPromise.query(`UPDATE tb_auth SET image='${imageUrl}',username='${username}', fullname='${fullname}',bio='${bio}' WHERE email='${req.query.email}'`)
                let [data] = await dbPromise.query(`SELECT * FROM tb_auth WHERE email='${req.query.email}'`)

                return res.status(200).json({ data })
            } else {
                await dbPromise.query(`UPDATE tb_auth SET username='${username}', fullname='${fullname}',bio='${bio}' WHERE email='${req.query.email}'`)
                let [data] = await dbPromise.query(`SELECT * FROM tb_auth WHERE email='${req.query.email}'`)

                return res.status(200).json({ data })
            }

        });
    },
    post: async (req, res) => {
        upload(req, res, async (err) => {
            const { username, fullname, bio } = req.body
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: "Error uploading image",
                });
            }

            let imageUrl = req.protocol + '://' + req.get('host') + "/profiles/" + req.file.filename

            await dbPromise.query(`INSERT INTO tb_user_content (email,image,caption) VALUES ('${req.query.email}','${imageUrl}','${req.body.caption}')`)

            let [data] = await dbPromise.query(`SELECT * FROM tb_user_content WHERE email='${req.query.email}' ORDER BY id DESC LIMIT 1`)

            res.status(200).json({ data })
        });
    },
    getAllContent: async (req, res) => {
        let [data] = await dbPromise.query(`SELECT uct.*,DATE_FORMAT(uct.createdAt, "%d %M %Y %T") as uptime, aut.fullname, aut.image as photo FROM tb_user_content uct JOIN tb_auth aut ON uct.email = aut.email ORDER BY uct.createdAt DESC`)
        let [comment] = await dbPromise.query(`SELECT cm.*,DATE_FORMAT(cm.createdAt, "%d %M %Y %T") as cmtime, aut.fullname FROM tb_comment cm JOIN tb_user_content act ON cm.id_content = act.id JOIN tb_auth aut ON aut.email = cm.email`)
        let [like] = await dbPromise.query(`SELECT lk.*, aut.fullname FROM tb_like lk JOIN tb_user_content act ON lk.id_content = act.id JOIN tb_auth aut ON aut.email = lk.email`)
        let [countLike] = await dbPromise.query(`SELECT COUNT(*) as totallike, id_content FROM tb_like WHERE like_status=1 GROUP BY id_content`)
        let arrComment = []// console.log(countLike)
        for (let i = 0; i < data.length; i++) {
            // if(data[i].id )
            for (let j = 0; j < comment.length; j++) {

                if (data[i].id === comment[j].id_content) {
                    arrComment.push(comment[j])
                    data[i].comment = arrComment
                }
            }

            for (let k = 0; k < like.length; k++) {
                if (data[i].id === like[k].id_content) {
                    data[i].like = like[k]
                }
            }

            for (let l = 0; l < countLike.length; l++) {
                if (data[i].id === countLike[l].id_content) {
                    data[i].countLike = countLike[l]
                }
            }
        }
        // console.log(data)
        console.log(comment)
        if (data.length > 0) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).json({ 'message': 'No content yet' })
        }
    },
    deleteContent: async (req, res) => {
        let [data] = await dbPromise.query(`SELECT * FROM tb_user_content WHERE id=${req.query.id}`)
        console.log(process.env)
        if (data.length > 0) {
            console.log(data[0].image.split('/')[4])
            fs.unlink(process.env.INIT_CWD + '/public/profiles/' + data[0].image.split('/')[4], (err => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file: example_file.txt");
                }
            }));
            await dbPromise.query(`DELETE FROM tb_user_content WHERE id=${req.query.id}`)
            res.status(200).json({ 'status': true })
        } else {
            res.status(400).json({ 'status': false })
        }
    },
    updateContent: async (req, res) => {
        try {
            await dbPromise.query(`UPDATE tb_user_content SET caption='${req.body.caption}' WHERE id=${req.query.id}`)

            res.status(200).json({ 'status': true })
        } catch (error) {
            res.status(400).json({ 'status': false })
        }

    },
}