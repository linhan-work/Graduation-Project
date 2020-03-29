//引入数据库处理工具
const db = require('../tools/dbUtil');
const sql = {
    getAll: 'select * from article limit 10',
    deleteArtilce: 'delete from article where article_id = ?',
}
const article = {
   getAll: async () => {
       let rs = await db.first();
       return rs;
   }
}

module.exports = article;