const { getUser } = require("../repositories/auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { authValidation } = require("../validations/auth")

exports.login = async (req, res) => {
    try {
        const data = await authValidation.parse(req.body)
        const user = await getUser(data.email)

        if(!user) throw { message: "Email/Password invalid!" }

        if(user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                process.env.TOKEN_KEY, // chave secreta de criptgrafia salva no arquivo .env
                {
                    expiresIn: "24h"
                }
            )

            return res.status(200).send({token})
        } else {
            return res.status(401).send({
                message: "Usuário e/ou senha incorretos.",
                user
            })
        }
    } catch (e) {
        return res.status(400).send(e)
    }
}
