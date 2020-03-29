//引入数据库处理工具
const db = require('../tools/dbUtil');
const sql = {
    inToken: 'insert into token(tokens) values(?)',
    ifHasToken: 'select * from token where tokens=?',
    upToken: 'update token set tokens=? where id=?',
    deleteToken: 'delete from token where tokens=?'
}
const tokenModel = {
    //插入token
    inToken: async (token) => {
        let rs = await db.execute(sql.inToken, token);
        return rs;
    },
    //取出token
    ifHasToken: async (token) => {
        let rs = await db.row(sql.ifHasToken, token);
        return rs;
    },
    //更新token
    upToken: async (token, id) => {
        console.log('id:' +id);
        id = parseInt(id)

        let rs = await db.execute(sql.upToken, token, id);
        return rs;
    },
    // 删除token
    deleteT: async (token) => {
        let rs = await db.execute(sql.deleteToken, token);
        return rs;
    }
}

module.exports = tokenModel;