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
        const row = await UserEntity.save();
        ctx.body = JSON.stringify(row);
    }
};

module.exports = router => {
    router.post('/api/register', register);
};
