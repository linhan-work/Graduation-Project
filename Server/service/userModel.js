//引入数据库处理工具
const db = require('../tools/dbUtil');
const sql = {
    login: 'select * from user where user_name = ? and user_password = ?',
    changeP: 'update user set user_password=? where user_name=?'
}
const user = {
    //登录处理
    login: async (user_name, user_password) => {
        let rs = await db.first(sql.login, user_name, user_password);
        return rs;
    },
    changePassword: async (user_name, newPassword) => {
        let rs = await db.first(sql.changeP, newPassword, user_name);
        return rs;
    },
    getPersonal: async (user_name) => {
        let rs = await db.first(sql.person, user_name);
        return rs;
    }
}

module.exports = user;