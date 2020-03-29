const Router = require('koa-router');
const articleModel = require('../service/articleModel')
const router = new Router();
/**
 * showdoc
 * @catalog 接口文档/文章相关
 * @title 获取文章
 * @description: 获取文章接口
 * @method get
 * @url /article/getall
 * @param id 必选 int 文章起始id, 默认1开始
 * @return: {"data":"*****"}
 * @return_param data json
 * @return_param msg string 提示信息
 * @remark 成功返回200 失败返回401
 */
router.get('/getall', async ctx => {
    let rs = await articleModel.getAll();
    rs = JSON.parse(JSON.stringify(rs));
    ctx.status = 200;
    ctx.body = JSON.stringify(rs);
})