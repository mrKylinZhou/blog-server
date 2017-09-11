const UserModel = require('../db/models/user');

const register = async ctx => {
    const { username, password, email } = ctx.request.body;
    let error = false;
    if (!username) {
        error = true;
    }
    if (!password) {
        error = true;
    }
    if (!email) {
        error = true;
    }
    if (error) {
        ctx.body = 'can\'t register';
    } else {
        const UserEntity = new UserModel({
            username,
            password,
            email
        });
        UserEntity.save((err, row) => {
            console.log(err, row);
            if (err) {
                ctx.body = err;
                return;
            }
            ctx.body = row;
        });
    }
};

module.exports = router => {
    router.post('/api/register', register);
};
