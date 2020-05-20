const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users');
const Products = require('../../mongo/models/products');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: 600 });
            res.send({ status: 'OK', data: { token } });
        } else {
            res.status(403).send({ status: 'BAD_CREDENTIALS', message: '' });
        }
    } catch (error) {
        res.status(500).send({ status: 'ERROR', message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { username, email, password, data } = req.body;

        const hash = await bcrypt.hash(password, 15);

        /** create forma 1 */
        // await Users.create({
        //     username,
        //     email,
        //     password: hash,
        //     data
        // })

        /** create forma 2 */
        const user = new Users();
        user.username = username;
        user.password = hash;
        user.email = email;
        user.data = data;
        await user.save();

        console.log('FIN', hash);

        res.send({
            status: 'OK',
            message: 'user created'
        });
    } catch (error) {
        if (error.code && error.code == 1100) {
            res.status(400).send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
            return;
        }
        res.status(500).send({ status: 'ERROR', message: error.message })
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            throw new Error('missing param userId');
        }

        await Users.findByIdAndDelete(userId);

        await Products.deleteMany({ user: userId });

        res.send({
            status: 'OK',
            message: 'user deleted'
        });
    } catch (error) {
        res.status(500).send({ status: 'ERROR', message: error.message })
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await Users.find().select({ password: 0, __v: 0});
        res.send({
            status: 'OK',
            data: users
        });
    } catch (error) {
        res.status(500).send({ status: 'ERROR', message: error.message })
    }

};

const updateUser = async (req, res) => {
    try {
        const { username, email, data } = req.body;
        await Users.findByIdAndUpdate(req.sessionData.userId, {
            username,
            email,
            data
        });
    } catch (error) {
        if (error.code && error.code == 1100) {
            res.status(400).send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
            return;
        }
        res.status(500).send({ status: 'ERROR', message: error.message });
    }
    res.send({
        status: 'OK',
        message: 'user updated'
    });
};

module.exports = {
    login,
    createUser,
    deleteUser,
    getUsers,
    updateUser,
}